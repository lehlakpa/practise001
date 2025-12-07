import { asyncHandler } from "../Utils/asyncHandler.js";
import ApiResponse from "../Utils/ApiResponse.js";
import apiError from "../Utils/apiError.js";
import { Admin } from "../Models/adminmodel.js";
import jwt from "jsonwebtoken";

const generatetokens = async (adminId) => {
  const user = await Admin.findById(adminId);
  if (!user) {
    throw new apiError(404, "User not found");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const adminregister = asyncHandler(async (req, res) => {
    //register for admin 
    const { fullname, username, password } = req.body;

    if ([fullname, username, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }

    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
        throw new apiError(400, "Username already exists");
    }

    const admin1 = await Admin.create({
        fullname,
        username,
        password,
    });

    // Convert the mongoose document to a plain object to manipulate it
    const createdAdmin = admin1.toObject();
    delete createdAdmin.password;
    delete createdAdmin.refreshToken;

    return res
        .status(201)
        .json(new ApiResponse(201, "Admin registered successfully", createdAdmin));
});

const adminLogin = asyncHandler(async (req, res) => {
    // login for admin
    const { username, password } = req.body;

      if (!username) {
        throw new apiError(400, "Username is required");
    }
    const admincheck= await Admin.findOne({username});
    if(!admincheck){
        throw new apiError(401, "Invalid username or password");
    }
    const isPasswordValid = await admincheck.comparePassword(password);

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid username or password");
    }

    const {accessToken,refreshToken} = await generatetokens(admincheck._id);
    const okuser= await Admin.findById(admincheck._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "Admin logged in successfully", {
                user: okuser,
                accessToken,
                refreshToken,
            })
        );
});

// admin section for logout
const adminLogout = asyncHandler(async (req, res) => {
   await Admin.findByIdAndUpdate(
        req.user._id,
        { $set: { accessToken: undefined, refreshToken: undefined } },
        { new: true }
    );

    const options = {
        httpOnly: true, // only secure in prod
        sameSite: "strict",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});

const refreshaccesstoken = asyncHandler(async (req, res) => {
    const incomingrefreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!incomingrefreshToken) {
        throw new apiError(401, "Unauthorized request");
    }
    const decoded = jwt.verify(incomingrefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await Admin.findById(decoded.id);

    if (!user) {
        throw new apiError(401, "Invalid Refresh Token");
    }
    if (user.refreshToken !== incomingrefreshToken) {
        throw new apiError(401, "Refresh token is expired or used!");
    }
    const { accessToken, refreshToken: newRefreshToken } = await generatetokens(user);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(200, "Access token refreshed successfully", { accessToken, refreshToken: newRefreshToken }));
});

export { adminLogin, adminregister, adminLogout, refreshaccesstoken };
