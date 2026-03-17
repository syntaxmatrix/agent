import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../integrations/emails/email.resend.js";
import { oauth2Client } from "../integrations/Auth/auth.google.js";
import url from "url";


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
    user.securityCodeExpiry = null;

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

/**
 * Register/Login a new user using Google.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const registerUserGoogle = asyncHandler(async (req, res) => { 
  try {
    // Log received session data for debugging
    // console.log("googleLink - req.session.state:", req.session?.state); #DebugOnly
    // console.log("googleLink - req.query.state:", req.query?.state);  #DebugOnly

    // Handle the OAuth 2.0 server response
    let q = url.parse(req.url, true).query;

    // console.log("url query received:", q);  #DebugOnly

    if (q.error) {
      // An error response e.g. error=access_denied
      console.error("Google OAuth Error:" + q.error);
      throw new APIError(400, `Google OAuth Error: ${q.error}`);
    }
    // CSRF State verification
    else if (q.state !== req.session.state) {
      // Verify state value
      console.error(
        "State mismatch. Possible CSRF attack. Expected:",
        req.session.state,
        "Received:",
        q.state
      );
      throw new APIError(403, "State mismatch. Possible CSRF attack.");
    } else {
      // Get access and refresh tokens (if access_type is offline)
      let { tokens } = await oauth2Client.getToken(q.code);
      oauth2Client.setCredentials(tokens);

      // console.log("googleToken received:", tokens);  #DebugOnly

      const googleAccessToken = tokens?.access_token;

      oauth2Client.setCredentials({ access_token: googleAccessToken });

      const oauth2 = google.oauth2({
        version: "v2",
        auth: oauth2Client,
      });

      const userinfo = await oauth2.userinfo.get();
      // console.log(userinfo.data);  #DebugOnly

      const { email, name, picture, verified_email } = userinfo.data;

      const userData = {
        name,
        email,
        password: crypto.randomBytes(20).toString("hex"), // Generate a random password since it's required by the schema
        username: email.split(/[@.]/).join(""), //Create a username by removing special characters from email
        isVerified: verified_email,
      };

      const result = await User.findOneAndUpdate(
        { email: email }, // The condition to find the user
        {
          $set: {
            profileURL: picture,
          },
          $setOnInsert: userData
        }, // The data to insert if the user doesn't exist
        {
          upsert: true, // This creates the document if it doesn't exist
          new: true, // This returns the new document if created, or the existing one if found
          setDefaultsOnInsert: true, // Applies your schema's default values on creation
          rawResult: true, // Return the raw result from MongoDB to check if the document was created or found
        }
      );

      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

      // const createdUser = await User.findById(user._id);  // #DebugOnly

      // console.log(createdUser,"ACC: ",accessToken); // #DebugOnly

      const user = result.value;
      let messageSuccess = "";

      if (result.lastErrorObject.upserted) {
        messageSuccess = "User Registered Successfully  with Google";
      } else {
        messageSuccess = "User Logged In Successfully";
      }

      return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new APIResponse(200, {}, messageSuccess));
    }
  } catch (error) {
    console.error("Error In Google Linking:", error);
    // Redirect to a frontend error page with a helpful message
    const errorMessage =
      error instanceof APIError
        ? error.message
        : "An unexpected error occurred during Google linking.";
    const statusCode = error instanceof APIError ? error.statusCode : 500;
    return res
      .status(statusCode)
      .redirect(`${process.env.DOMAIN}?message=${encodeURIComponent(errorMessage)}`);
  }
});

/**
 * Send Encrypted Email to frontend.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getEncryptedEmail = asyncHandler(async (req, res) => {  // #Need to Remove
  const secret = process.env.SECRET;

  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    throw new APIError(404, "No accessToken cookie found for Google Auth.");
  }
  const { email } = jwt.verify(accessToken, secret);

  if (!email) {
    throw new APIError(400, "Email ID is required");
  }

  //Basic email format validation (optional)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new APIError(400, "Invalid email format");
  }

  const encryptedEmail = CryptoJS.AES.encrypt(email, secret).toString();
  return res
    .status(200)
    .json(
      new APIResponse(
        200,
        { email: encryptedEmail },
        "Successfully Encrypted Email for Googgle Auth"
      )
    );
});


/**
 * Add Gmail Credentials to existing user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const gmailLink = asyncHandler(async (req, res) => {
  try {
    // Log received session data for debugging
    console.log(
      "googleLink - req.session.emailForGoogleLink:",
      req.session?.emailForGoogleLink
    );
    console.log("googleLink - req.session.state:", req.session?.state);
    console.log("googleLink - req.query.state:", req.query?.state);

    const email = req.session?.emailForGoogleLink; // Get email from session

    if (!email) {
      // Handle case where session data is missing or expired
      console.error(
        "gmailLink: Email not found in session. Session might be expired or not set."
      );
      throw new APIError(
        401,
        "Session data missing for Google Gmail linking. Please try registering again."
      );
    }

    // Handle the OAuth 2.0 server response
    let q = url.parse(req.url, true).query;

    console.log("url query received:", q);

    if (q.error) {
      // An error response e.g. error=access_denied
      console.error("Google Gmail OAuth Error:" + q.error);
      throw new APIError(400, `Google Gmail OAuth Error: ${q.error}`);
    }
    // CSRF State verification
    else if (q.state !== req.session.state) {
      // Verify state value
      console.error(
        "State mismatch. Possible CSRF attack. Expected:",
        req.session.state,
        "Received:",
        q.state
      );
      throw new APIError(403, "State mismatch. Possible CSRF attack.");
    } else {
      // Get access and refresh tokens (if access_type is offline)
      let { tokens } = await oauth2Client.getToken(q.code);
      oauth2Client.setCredentials(tokens);

      // console.log("googleToken received:", tokens); // #Only for Testing

      const googleRefreshToken = tokens?.refresh_token;
      const googleAccessToken = tokens?.access_token;

      if (!googleRefreshToken) {
        throw new APIError(
          405,
          "Google Refresh Token Not Found in Google Response"
        );
      }
      if (!googleAccessToken) {
        throw new APIError(
          405,
          "Google Access Token Not Found in Google Response"
        );
      }
      // // Check for required scopes
      // if (
      //   !tokens.scope.includes("https://www.googleapis.com/auth/youtube.upload")
      // ) {
      //   throw new APIError(
      //     404,
      //     "Failed: Required scope YouTube Upload is missing!"
      //   );
      // }

      const user = await User.findOne({ email }); // Find user using email from session

      if (!user) {
        console.error(`User with email ${email} not found after Google OAuth.`);
        throw new APIError(
          404,
          "User not found in database for Google Gmail linking email."
        );
      }

      // END OF SECTION

      user.googleRefreshToken = googleRefreshToken; //Saving Google Refresh Token in MongoDB

      const name = user.name;

      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

      await user.save({ validateBeforeSave: false }); // saving to db

      // --- Clear session data after successful linking ---
      if (req.session) {
        req.session.emailForGoogleLink = undefined;
        req.session.state = undefined; // Clear CSRF state
        // req.session.destroy((err) => {
        //     if (err) console.error("Error destroying session:", err);
        // });
      }

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : undefined
      };
      console.log("Linking Google Route End");
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .redirect(`${process.env.FRONTEND_SUCCESS_URL}?linked=true`);
    }
  } catch (error) {
    console.error("Error In Google Linking:", error);
    // Redirect to a frontend error page with a helpful message
    const errorMessage =
      error instanceof APIError
        ? error.message
        : "An unexpected error occurred during Google linking.";
    const statusCode = error instanceof APIError ? error.statusCode : 500;
    return res
      .status(statusCode)
      .redirect(
        `${process.env.FRONTEND_ERROR_URL}?error=${encodeURIComponent(errorMessage)}`
      );
  }
});

export {
  registerUser,
  checkEmailAvailability,
  checkUsernameAvailability,
  verifyEmailID,
  verifySecurityCode,
  loginUser,
  logoutUser,
  registerUserGoogle,
  getEncryptedEmail,
  gmailLink
};
