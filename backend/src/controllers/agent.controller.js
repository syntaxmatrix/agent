import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { routeQuery ,chatQuery ,draftMail} from "../agents/gemini.js";
import { sendgmail } from "../integrations/Google/gmail.js";
import { oauth2ClientGmail } from "../integrations/Auth/gmail.google.js";

/**
 * Function to remove unwanted string to convert JSON.
 * @param {string} str 
 * @returns {string} 
 */
function cleanJsonString(str) {
  return str
    .replace(/```json\s*/i, "") // remove opening ```json
    .replace(/```$/, "")        // remove closing ```
    .trim();                    // clean extra spaces
}

/**
 * Test Function for Gemini Response.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const intentCheck = asyncHandler(async (req, res) => { 
  try {
    // q is the natural-language query from the client.
    let { q } = req?.query
    // Logged-in user's Gmail refresh token, used for Gmail actions.
    let googleRefreshToken = req?.user?.googleRefreshToken;
    // ans will hold the final response based on selected route.
    let ans;
    // routeQuery classifies the user request into chat/gmail agent routes.
    const text = await routeQuery(q);
    // text.route 
    if(text.route === "chat"){
      // Direct conversational response path.
      ans = await chatQ(q)
    } else if(text.route === "gmail_agent"){
      // Gmail-specific intents like draft/send email.
      ans = await GmailAgent(text, q,googleRefreshToken)
    } else {
      // Fallback when model route is unknown.
      ans = "No valid route found in the response.";
    }
    // Return both routing metadata and generated answer.
    res.json({ ok: true, text: text , ans: ans || "No answer generated" });
  } catch (err) {
    console.error("/gen error", err);
    // Uniform error payload for frontend handling.
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
});

/**
 * Chat Query function.
 * @param {String} query - String Query.
 */
async function chatQ(query) {
  try {
    // Delegates free-form chat generation to Gemini chat agent.
    const text = await chatQuery(query);
    return text;

  } catch (err) {
    console.error("/chat error", err);
  }
}

async function GmailAgent(text, query,googleRefreshToken){
  if(text.intent === "draft_email"){
    // Draft only: generate subject/body, do not send.
    return await draftMail(query);
  } else if(text.intent === "send_email"){
    // Build email content first from user intent.
    const emailContent = await draftMail(query);
    // Handle send email logic using emailContent
    // Send via Gmail integration using stored refresh token for auth.
    return await sendgmail(oauth2ClientGmail,text.entities.to, emailContent.subject, emailContent.body,googleRefreshToken);
  } else if(text.intent === "read_email"){
    // Handle read email logic
  } else {
    // Guard against unsupported or malformed intent values.
    throw new APIError("Invalid intent for Gmail Agent");
  }
}

export {
    chatQ,
    intentCheck,
    GmailAgent
};