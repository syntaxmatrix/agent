import dotenv from "dotenv";
import { Resend } from "resend";
import {
  generateVerificationEmailHTML,
  generateWelcomeEmailHTML,
  generateSecurityEmailHTML
} from "./email.html.js";
import { APIError } from "../../utils/APIError.js";

const RESENDKEY = process.env.RESEND_API_KEY;

// Load API key securely from environment variables
const resend = new Resend(RESENDKEY);

// Function to send a verification email
const sendVerificationEmail = async (email, name, verifyCode) => {
  // Email HTML template
  const emailHTML = generateVerificationEmailHTML(name, verifyCode);

  try {
    const { data, error } = await resend.emails.send({
      from: "Agent <noreply.agent@retube.live>",
      to: [email],
      subject: "Agent | Verification Code",
      html: emailHTML,
    });

    if (error) {
      throw new APIError(500, error.message);
    }

    return { message: "OTP sent successfully", email };
  } catch (err) {
    throw new APIError(500, `Failed to send email: ${err.message}`);
  }
};

// Function to send Security code for password reset Only.
// Function to send a verification email
const sendSecurityCodeMail = async (email, name, verifyCode) => {
  // Email HTML template
  const emailHTML = generateSecurityEmailHTML(name, verifyCode);

  try {
    const { data, error } = await resend.emails.send({
      from: "Agent <noreply.agent@retube.live>",
      to: [email],
      subject: "Agent | Security Code",
      html: emailHTML,
    });

    if (error) {
      throw new APIError(500, error.message);
    }

    return { message: "OTP sent successfully", email };
  } catch (err) {
    throw new APIError(500, `Failed to send email: ${err.message}`);
  }
};

// Function to send a primary user success email
const sendWelcomeEmail = async (email, name) => {
  // Email HTML template
  const emailHTML = generateWelcomeEmailHTML(name);

  try {
    const { data, error } = await resend.emails.send({
      from: "Agent <noreply.agent@retube.live>",
      to: [email],
      subject: "Agent | Successful Registration",
      html: emailHTML,
    });

    if (error) {
      throw new APIError(500, error.message);
    }

    return { message: "registration/welcome email sent successfully", email };
  } catch (err) {
    throw new APIError(
      500,
      `Failed to send to user welcome email: ${err.message}`
    );
  }
};

export { sendVerificationEmail, sendWelcomeEmail, sendSecurityCodeMail };
