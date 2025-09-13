import { Resend } from "resend";
import {
  generateVerificationEmailHTML,
  generateWelcomeEmailHTML
 } from "./email.html.js";
import { APIError } from "../../backend/src/utils/APIError.js";

// Load API key securely from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to send a verification email
const sendVerificationEmail = async (email,name,verifyCode) => {

  // Email HTML template
  const emailHTML = generateVerificationEmailHTML(name,verifyCode)

  try {
    const { data, error } = await resend.emails.send({
      from: "Agent <noreply@retube.live>",
      to: [email],
      subject: "Agent | Verification Code",
      html: emailHTML,
    });

    if (error) {
      throw new APIError(500,error.message);
    }

    return { message: "OTP sent successfully", email };
  } catch (err) {
    throw new APIError(500,`Failed to send email: ${err.message}`);
  }
};

// Function to send a inviteCode email
const sendInviteCodeEmail = async (email,name,inviteCode) => {

  // Email HTML template
  const emailHTML = generateInviteCodeEmailHTML(name,email,inviteCode)

  try {
    const { data, error } = await resend.emails.send({
      from: "Retube <noreply@retube.live>",
      to: [email],
      subject: "Retube | Invite Code",
      html: emailHTML,
    });

    if (error) {
      throw new APIError(500,error.message);
    }

    return { message: "inviteCode successfully", email };
  } catch (err) {
    throw new APIError(500,`Failed to send email: ${err.message}`);
  }
};

// Function to send a primary user success email
const sendWelcomeEmail = async (email,name) => {

  // Email HTML template
  const emailHTML = generateWelcomeEmailHTML(name)

  try {
    const { data, error } = await resend.emails.send({
      from: "Agent <noreply@retube.live>",
      to: [email],
      subject: "Agent | Successful Registration",
      html: emailHTML,
    });

    if (error) {
      throw new APIError(500,error.message);
    }

    return { message: "regsitration/welcome email sent successfully", email };
  } catch (err) {
    throw new APIError(500,`Failed to send to user welcome email: ${err.message}`);
  }
};

export { 
  sendVerificationEmail,
  sendWelcomeEmail,
};
