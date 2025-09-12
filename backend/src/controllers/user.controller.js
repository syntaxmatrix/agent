import { asyncHandler } from "../utils/asynchandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

/**
 * Registers a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { username,  email, password} = req.body;

    // check if email or username exists
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: "Email or Username already in use" });

    // verification + security code
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h
    const securityCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    
    name = "rahul";;
    subscription = "Free";
    username ="jbdiknwknd";
    const user = await User.create({
      username,
      name,
      email,
      password,
      subscription,
      securityCode,
      verificationToken,
      verificationTokenExpires
    });
    console.log("Registered User:", user);
    console.log("TEST 1");

    // In production, send verification email with token link
    const verifyUrl = `${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}`;

    res.status(201).json({
      message: "User registered! Verify your email.",
      verifyUrl,
      securityCode // In production: send via email/SMS, not response
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password, securityCode } = req.body;

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(401).json({ message: "Verify your email first" });
    }

    // Optional: check security code (like OTP/2FA)
    if (securityCode && user.securityCode !== securityCode) {
      return res.status(401).json({ message: "Invalid security code" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        subscription: user.subscription
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export {
  registerUser,
  verifyEmail,
  loginUser,
};

