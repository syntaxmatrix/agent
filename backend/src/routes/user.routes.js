import { Router } from "express";
import {
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
} from "../controllers/user.controller.js";
import { getGoogleAuthURL } from "../integrations/Auth/auth.google.js";
import { getGmailAuthURL } from "../integrations/Auth/gmail.google.js";
import { getEmail } from "../middlewares/email.js";
import { auth_middleware } from "../middlewares/auth.js";

const router = Router();

// ## Unsecured Routes #Starts

//Email Availbility Check
router.route("/emailavailability").get(checkEmailAvailability); // example.com/api/v1/user/emailavailability?email=mail@agent.com

//Username Availbility Check
router.route("/usernameavailability").get(checkUsernameAvailability); // example.com/api/v1/user/usernameavailabilityusername=rahul

// REGISTER USER
router.route("/register").post(registerUser); // example.com/api/v1/user/register

// LOGIN USER
router.route("/login").post(loginUser); // example.com/api/v1/user/login

// ## Unsecured Routes #Ends

//#Semi-Secured Route #Starts

// VERIFY EMAIL ID
router.route("/verifyemail").post(verifyEmailID); // example.com/api/v1/user/verifyemail

// GOOGLE OAUTH2 LOGIN
router.route("/google").get(getGoogleAuthURL); // example.com/api/v1/user/google

// Google OAuth2 callback route
router.route("/google/callback").get(registerUserGoogle); // example.com/api/v1/user/google/callback

//#Semi-Secured Route #Ends

// ## Secured Routes #Starts

// LOGOUT USER
router.route("/logout").post(auth_middleware,logoutUser); // example.com/api/v1/user/logout

//Step 0: EMAIL ENCRYPTION FOR GOOGLE GMAIL OAUTH2
router.route("/email").get(getEncryptedEmail); // example.com/api/v1/user/email

//Step 1: GOOGLE GMAIL OAUTH2 LOGIN
router.route("/gmail").get(getEmail,getGmailAuthURL); // example.com/api/v1/user/gmail

// Step 2: GOOGLE GMAIL OAUTH2 CALLBACK
router.route("/gmail/callback").get(gmailLink); // example.com/api/v1/user/gmail/callback

// ## Secured Routes #Ends

export default router;
