import { asyncHandler } from "../utils/asynchandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";

/**
 * Registers a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const registerUser = asyncHandler(async (req, res) => {

});

export {
    registerUser
};
