import {asyncHandler} from "../Utils/asyncHandler.js";
import ApiResponse from "../Utils/ApiResponse.js";

const userLogin = asyncHandler(async(req, res, next) => {
    // Logic for user login
    const response = new ApiResponse(200, "User logged in successfully", { /* user data */ });
    res.status(200).json(response);
});

export { userLogin };
