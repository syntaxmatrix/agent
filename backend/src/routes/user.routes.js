import { Router } from "express";
import {
  registerUser,
  checkEmailAvailability,
  checkUsernameAvailability,
  verifyEmailID,
  loginUser,
  logoutUser
} from "../controllers/user.controller.js";
import { getGoogleAuthURL } from "../integrations/Auth/auth.google.js";

const router = Router();

// ## Unsecured Routes #Starts

//Email Availbility Check
router.route("/emailavailability").get(checkEmailAvailability); // example.com/api/v1/user/emailavailability?email=mail@agent.com

//Username Availbility Check
router.route("/usernameavailability").get(checkUsernameAvailability); // example.com/api/v1/user/usernameavailabilityusername=rahul

// REGISTER USER
router.route("/register").post(registerUser); // example.com/api/v1/user/register

// ## Unsecured Routes #Ends

// VERIFY EMAIL #Semi-Secured Route
router.route("/verifyemail").post(verifyEmailID); // example.com/api/v1/user/verifyemail

// GOOGLE OAUTH2 LOGIN
router.route("/google").get(getGoogleAuthURL); // example.com/api/v1/user/google
// ## Secured Routes #Starts

// LOGIN USER
router.route("/login").post(loginUser); // example.com/api/v1/user/login

// LOGOUT USER
router.route("/logout").post(logoutUser); // example.com/api/v1/user/logout
// ## Secured Routes #Ends

export default router;
