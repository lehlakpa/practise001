import { asyncHandler } from "../Utils/asyncHandler.js";
import ApiResponse from "../Utils/ApiResponse.js";
import apiError from "../Utils/apiError.js";
import { Admin } from "../Models/adminmodel.js";
import jwt from "jsonwebtoken";
import { uploadImage } from "../Utils/cloudinaryupload.js";
import { UploadImages } from "../Models/uploadmodel.js";
import Booking from "../Models/bokingmodel.js";
import cloudinary from "../config/cloudinaryconfig.js";

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
    const { fullname, username, password } = req.body;

    // Validate required fields
    if ([fullname, username, password].some(field => !field || field.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }

    // Check if username already exists
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
        throw new apiError(400, "Username already exists");
    }

    // Create admin
    const admin1 = await Admin.create({
        fullname,
        username,
        password,
    });

    // Fetch created admin without sensitive fields
    const createdAdmin = await Admin.findById(admin1._id)
        .select("-password -refreshToken");

    return res
        .status(201)
        .json(new ApiResponse(201, "Admin registered successfully", createdAdmin));
});
const getAdmin = asyncHandler(async (req, res) => {
  // Get admin details
  const admin = await Admin.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Admin fetched successfully", admin));
});


// Booking schema for order
const createBooking = asyncHandler(async (req, res) => {
    try {
        const { plan, connectionType, fullName, phone, municipality, tole, paymentMethod } = req.body;
        // Validate required fields
        if ([connectionType, fullName, phone, municipality].some(field => !field || field.trim() === "")) {
            throw new apiError(400, "All required fields must be filled");
        }
        if (!plan) {
            throw new apiError(400, "Plan details are required");
        }
        const newBooking = await Booking.create({
            plan,
            connectionType,
            fullName,
            phone,
            municipality,
            tole,
            paymentMethod,
        });
        return res.status(201).json(new ApiResponse(201, "Booking created successfully", newBooking));

    } catch (error) {
        console.error("Create order failed", error);
        return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
    }
});

const getBookings = asyncHandler(async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        return res.status(200).json(new ApiResponse(200, "Bookings fetched successfully", bookings));
    } catch (error) {
        console.error("Get order errors", error);
        return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
    }
});

const getBookingById = asyncHandler(async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new apiError(404, "Booking not found");
        }
        return res.status(200).json(new ApiResponse(200, "Booking fetched successfully", booking));
    } catch (error) {
        console.error("Get order by ID failed", error);
        return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
    }
});

const updateBooking = asyncHandler(async (req, res) => {
    try {
        const status = req.body.status;
        const allowedStatus = [
            "Pending",
            "Confirmed",
            "Installed",
            "Cancelled",
        ];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }
        const book = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!book) {
            throw new apiError(404, "Booking not found");
        }
        return res.status(200).json(new ApiResponse(200, "Booking updated successfully", book));
    } catch (error) {
        console.error("Update booking failed", error);
        return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
    }
});

const deleteBooking = asyncHandler(async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            throw new apiError(404, "Booking not found");
        }
        return res.status(200).json(new ApiResponse(200, "Booking deleted successfully"));
    } catch (error) {
        console.error("Delete booking failed", error);
        return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
    }
});



const adminLogin = asyncHandler(async (req, res) => {
    // login for admin
    const { username, password } = req.body;

    if (!username) {
        throw new apiError(400, "Username is required");
    }
    const admincheck = await Admin.findOne({ username });
    if (!admincheck) {
        throw new apiError(401, "Invalid username or password");
    }
    const isPasswordValid = await admincheck.comparePassword(password);

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid username or password");
    }

    const { accessToken, refreshToken } = await generatetokens(admincheck._id);
    const okuser = await Admin.findById(admincheck._id).select("-password -refreshToken");

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
        .json(new ApiResponse(200, "User logged out successfully", null));
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

const adminChangepassword = asyncHandler(async (req, res) => {
    const { oldpassword, newpassword } = req.body;
    const user = await Admin.findById(req.user._id);
    const isPasswordValid = await user.comparePassword(oldpassword);
    if (!isPasswordValid) {
        throw new apiError(401, "Invalid old password");
    }
    user.password = newpassword;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(200, "Password changed successfully"));
});

//admin upload sections 
const adminupload = asyncHandler(async (req, res) => {
    const { title, description, price, duration, tvOptions } = req.body;

    // Validate required fields
    if ([title, description, price, duration, tvOptions].some((field) => !field || field.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }

    if (price === undefined || price === null || isNaN(price)) {
        throw new apiError(400, "Valid price is required");
    }

    // Validate images
    if (!req.files || !req.files.images || req.files.images.length === 0) {
        throw new apiError(400, "Image is required");
    }

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
        req.files.images.map((file) => uploadImage(file.path))
    );

    if (uploadedImages.some((image) => !image)) {
        throw new apiError(500, "Failed to upload one or more images to Cloudinary");
    }

    const createdPackage = await UploadImages.create({
        title,
        description,
        price,
        duration,
        tvOptions,
        images: uploadedImages.map((img) => ({
            url: img.secure_url,
            public_id: img.public_id,
        })),
    });


    return res
        .status(201)
        .json(new ApiResponse(201, "Package created successfully", createdPackage));
});

const getpackages= asyncHandler(async (req, res) => {
    const packages = await UploadImages.find().sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, "Packages fetched successfully", packages));
});

const deleteUpload = asyncHandler(async (req, res) => {
    const upload = await UploadImages.findById(req.params.id);

    if (!upload) {
        throw new apiError(404, "Upload not found");
    }

    // Delete images from Cloudinary first
    if (upload.images?.length) {
        const publicIds = upload.images
            .filter(img => img.public_id)
            .map(img => img.public_id);

        if (publicIds.length) {
            await cloudinary.api.delete_resources(publicIds);
        }
    }

    // Now delete from MongoDB
    await UploadImages.findByIdAndDelete(req.params.id);

    return res
        .status(200)
        .json(new ApiResponse(200, "Upload deleted successfully"));
});

const editUpload = asyncHandler(async (req, res) => {
    const upload = await UploadImages.findById(req.params.id);

    if (!upload) {
        throw new apiError(404, "Upload not found");
    }

    // If new images are provided
    if (req.files && req.files.images && req.files.images.length > 0) {

        // Delete old images from Cloudinary
        if (upload.images && upload.images.length > 0) {
            const deletePromises = upload.images.map(image =>
                image.public_id
                    ? cloudinary.uploader.destroy(image.public_id)
                    : Promise.resolve()
            );

            await Promise.all(deletePromises);
        }

        // Upload new images to Cloudinary
        const uploadedImages = await Promise.all(
            req.files.images.map((file) => uploadImage(file.path))
        );

        // Replace with new images
        upload.images = uploadedImages.map((img) => ({
            url: img.secure_url,
            public_id: img.public_id,
        }));
    }

    // Update other fields if needed
    if (req.body.title) upload.title = req.body.title;
    if (req.body.description) upload.description = req.body.description;
    if (req.body.price) upload.price = req.body.price;
    if (req.body.duration) upload.duration = req.body.duration;
    if (req.body.tvOptions) upload.tvOptions = req.body.tvOptions;

    await upload.save();

    return res.status(200).json(
        new ApiResponse(200, upload, "Upload updated successfully")
    );
});



export { deleteUpload,editUpload, adminLogin,getpackages, adminupload,getAdmin, adminChangepassword, adminregister, adminLogout, refreshaccesstoken, getBookings, getBookingById, updateBooking, deleteBooking, createBooking };
