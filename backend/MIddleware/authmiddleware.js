import { asyncHandler } from "../Utils/asyncHandler.js";
import ApiError from "../Utils/apiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../Models/adminmodel.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  // 1. Get token (cookie or Authorization header)
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  // 2. Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  // 3. Find admin
  const user = await Admin.findById(decoded.id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  // 4. Attach user to request
  req.user = user;
  next();
});
