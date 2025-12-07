import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new Schema({
    fullname: {
        required: [true, "Fullname is required"],
        type: String
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],

    },
    refreshToken: {

        type: String,
    },
},
    {
        timestamps: true
    }

);
adminSchema.pre("save", async function (next) {
    if (!this.isNew && !this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60 * 60, // 1 hour
    });
}
adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 * 30, // 30 days
    });
}
 export const Admin = mongoose.model("Admin", adminSchema);
