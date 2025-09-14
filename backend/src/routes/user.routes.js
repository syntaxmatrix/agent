import { Router } from "express";
import {
    registerUser,
    checkEmailAvailability,
    checkUsernameAvailability,
    verifyEmailID
} from "../controllers/user.controller.js";

const router = Router();

// ## Unsecured Routes #Starts

//Email Availbility Check 
router.route("/emailavailability").get(checkEmailAvailability);  // example.com/api/v1/user/emailavailability?email=mail@agent.com

//Username Availbility Check
router.route("/usernameavailability").get(checkUsernameAvailability);  // example.com/api/v1/user/usernameavailabilityusername=rahul

// REGISTER USER
router.route("/register").post(registerUser);  // example.com/api/v1/user/register

// ## Unsecured Routes #Ends

// VERIFY EMAIL #Semi-Secured Route
router.route("/verifyemail").post(verifyEmailID);  // example.com/api/v1/user/verifyemail

// GOOGLE OAUTH2 LOGIN
router.route("/google").get(getGoogleAuthURL);  // example.com/api/v1/user/google
// ## Secured Routes #Starts

// LOGIN USER
// router.route("/login").post(loginUser);

// ## Secured Routes #Ends



export default router;
