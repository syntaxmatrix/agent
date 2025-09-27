import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { geminiParse } from "../agents/gemini.js";
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
const testfun = asyncHandler(async (req, res) => { 
  try {
    let { q } = req?.query
    const query = "send email to shivendra and saying how are you";
    const text = await geminiParse(q);
    res.json({ ok: true, text });
  } catch (err) {
    console.error("/gen error", err);
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
});

/**
 * Parsing Controller.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const parserController = asyncHandler(async (req, res) => { 
  try {
    let { q } = req?.query
    const gemini_response = await geminiParse(q);

    const cleaned = cleanJsonString(gemini_response.text);
    const parsed = JSON.parse(cleaned);

    console.log(parsed.intents[0].intent);

    return res.status(200);
   
  } catch (err) {
    console.error("/ask error", err);
    throw new APIError(500,err?.message)
  }
});


export {
    testfun,
    parserController
};
