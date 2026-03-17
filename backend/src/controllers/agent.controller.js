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
    let { q } = req?.query
    let googleRefreshToken = req?.user?.googleRefreshToken;
    let ans;
    const text = await routeQuery(q);
    // text.route 
    if(text.route === "chat"){
      ans = await chatQ(q)
    } else if(text.route === "gmail_agent"){
      ans = await GmailAgent(text, q,googleRefreshToken)
    } else {
      ans = "No valid route found in the response.";
    }
    res.json({ ok: true, text: text , ans: ans || "No answer generated" });
  } catch (err) {
    console.error("/gen error", err);
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
});

/**
 * Chat Query function.
 * @param {String} query - String Query.
 */
async function chatQ(query) {
  try {
    const text = await chatQuery(query);
    return text;

  } catch (err) {
    console.error("/chat error", err);
  }
}

async function GmailAgent(text, query,googleRefreshToken){
  if(text.intent === "draft_email"){
    return await draftMail(query);
  } else if(text.intent === "send_email"){
    const emailContent = await draftMail(query);
    // Handle send email logic using emailContent
    return await sendgmail(oauth2ClientGmail,text.entities.to, emailContent.subject, emailContent.body,googleRefreshToken);
  } else if(text.intent === "read_email"){
    // Handle read email logic
  } else {
    throw new APIError("Invalid intent for Gmail Agent");
  }
}

export {
    chatQ,
    intentCheck,
    GmailAgent
};