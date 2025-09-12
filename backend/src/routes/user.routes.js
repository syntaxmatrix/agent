import { Router } from "express";

import {
    registerUser,
    verifyEmail,
    loginUser,
    // checkUsernameAvailability,
    // checkEmailAvailability
} from "../controllers/user.controller.js";

const router = Router();


// REGISTER USER
router.route("/register").post(registerUser);

// VERIFY EMAIL
router.route("/verify/:token").get(verifyEmail);

// LOGIN USER
router.route("/login").post(loginUser);

// router.route("/emailavailability").get(checkEmailAvailability);


export default router;
