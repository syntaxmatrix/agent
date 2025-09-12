import { asyncHandler } from "../utils/asynchandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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
  const username = email.split(/[@.]/).join('');

  // Create User
  const user = await User.create({
    name,
    email,
    password,
    username,
    securityCode,
    securityCodeExpiry,
  });

  console.log("Registered User:", user);

  // Fetch created user without sensitive data
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -inviteCode"
  );
  if (!createdUser) {
    throw new APIError(500, "Unable to retrieve user data after registration");
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
        "User registered successfully. Verification email sent."
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

  const foundUser = await User.findOne({ username : decodedUsername });

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

export {
  registerUser,
  checkEmailAvailability,
  checkUsernameAvailability
};

