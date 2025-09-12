import { Router } from "express";
import {
    registerUser,
    checkEmailAvailability,
    checkUsernameAvailability,
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
// router.route("/verify/:token").get(verifyEmail);

// ## Secured Routes #Starts

// LOGIN USER
// router.route("/login").post(loginUser);

// ## Secured Routes #Ends


export default router;
