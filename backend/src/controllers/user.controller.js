import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../integrations/emails/email.resend.js";

//User Controllers

/**
 * Generates an access token and a refresh token for a given user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{accessToken: string, refreshToken: string}>} An object containing the access and refresh tokens.
 * @throws {APIError} If something goes wrong during token generation.
 */
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // Save the new refresh token

    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIError(
      500,
      "Went Wrong while generating refresh and access token"
    );
  }
};

/**
 * Default cookies options.
 */
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

/**
 * Generates a random 6-digit verification code.
 * @returns {string} The generated verification code.
 */
const genVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Checks the availability of an email address.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const checkEmailAvailability = asyncHandler(async (req, res) => {
  const encodedEmail = req.query.email;

  if (!encodedEmail) {
    throw new APIError(404, "Email is Required to check");
  }
  const decodedEmail = decodeURIComponent(encodedEmail);

  const foundUser = await User.findOne({ email: decodedEmail });

  if (foundUser) {
    return res.status(200).json({
      message: "This Email ID is Already Registered with Us",
      success: true,
      status: 200,
    });
  } else {
    return res.status(200).json({
      message: "Email ID is Available",
      success: true,
      status: 200,
    });
  }
});

/**
 * Registers a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if ([email, password].some((field) => !field?.trim())) {
    throw new APIError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new APIError(409, "User already exists");
  }

  const securityCode = genVerificationCode();
  const securityCodeExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

  //Generating tempToken for Registeration Process
  const tempToken = jwt.sign(
    { email }, // generating using email
    process.env.SECRET,
    { expiresIn: process.env.TEMP_TOKEN_EXPIRY }
  );

  //Adding Default Name
  const name = email.split(/[@.]/)[0];
  const username = email.split(/[@.]/).join("");

  // Create User
  const user = await User.create({
    name,
    email,
    password,
    username,
    securityCode,
    securityCodeExpiry,
  });

  console.log("Registered User:", user); /// #Remove Must

  // Fetch created user without sensitive data
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -inviteCode"
  );
  if (!createdUser) {
    throw new APIError(500, "Unable to retrieve user data after registration");
  }

  //Email Sending Using Resend
  try {
    await sendVerificationEmail(email, name, securityCode);
    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.error(`Email sending failed: ${err.message}`);
    throw new APIError(
      500,
      "User registered but failed to send verification email"
    );
  }

  // Cookie options for tempToken
  const tempTokenCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None", // critical for cross-origin cookies
    maxAge: 1000 * 60 * 15, // 15 min expiry for tempToken
  };
  console.log("Regsiter Route End");
  return res
    .status(201)
    .cookie("tempToken", tempToken, tempTokenCookieOptions)
    .json(
      new APIResponse(
        200,
        [],
        "User Registered Successfully. Verification Email Sent."
      )
    );
});

/**
 * Checks the availability of a username.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const checkUsernameAvailability = asyncHandler(async (req, res) => {
  const encodedUsername = req.query.username;

  if (!encodedUsername) {
    throw new APIError(404, "Username is Required to check");
  }
  const decodedUsername = decodeURIComponent(encodedUsername);

  const foundUser = await User.findOne({ username: decodedUsername });

  if (foundUser) {
    return res.status(200).json({
      message: "This Username is Already Registered with Us",
      success: true,
      status: 200,
    });
  } else {
    return res.status(200).json({
      message: "Username is Available",
      success: true,
      status: 200,
    });
  }
});

/**
 * Verify the Email ID of User.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const verifyEmailID = asyncHandler(async (req, res) => {
  const tempToken = req.cookies?.tempToken;

  if (!tempToken) {
    throw new APIError(404, "No temp cookie found for verification.");
  }
  const decodeToken = jwt.verify(tempToken, process.env.SECRET);

  const email = decodeToken.email;
  const { securityCode } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new APIError(404, "User doesn't exist");
  }

  // Check if verification code is expired
  const isCodeValid =
    user.securityCodeExpiry && user.securityCodeExpiry > Date.now();
  if (!isCodeValid) {
    throw new APIError(400, `Verification code validity expired ${Date.now()}`);
  }

  // Check if verify code is correct & not expired
  if (user.securityCode === securityCode) {
    user.isVerified = true;
    user.securityCode = null;
    user.securityCode = null;

    // Save changes to database
    await user.save({ validateBeforeSave: false }); // Set validateBeforeSave to false if verifyCode/Expiry are being unset

    return res
      .status(200)
      .json(new APIResponse(200, {}, "User is successfully verified"));
  }
  throw new APIError(400, "Invalid verification code");
});

/**
 * Verify the Security Code(OTP) of User.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const verifySecurityCode = asyncHandler(async (req, res) => {});

/**
 * Login with Email and Passwords.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new APIError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new APIError(401, "Invalid email or user doesn't exist");
  }

  const isMatchPassword = await user.isPasswordCorrect(password);

  if (!isMatchPassword) {
    throw new APIError(401, "Invalid Password");
  }

  // Generate accessToken, refreshToken
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new APIResponse(200, {}, "You are successfully Logged In "));
});

/**
 * Logout User
 * Clears all authentication cookies and invalidates refresh token
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // Assuming you have jwtAuthMiddleware to set req.user

  if (userId) {
    // Optionally invalidate refresh token in DB
    await User.findByIdAndUpdate(
      userId,
      { refreshToken: null },
      { validateBeforeSave: false }
    );
  }

  // Clear cookies
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("tempToken", cookieOptions)
    .status(200)
    .json(new APIResponse(200, {}, "Successfully Logged Out"));
});

export {
  registerUser,
  checkEmailAvailability,
  checkUsernameAvailability,
  verifyEmailID,
  verifySecurityCode,
  loginUser,
  logoutUser,
};
