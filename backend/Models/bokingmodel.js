import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        // Internet Plan Info
        plan: {
            title: {
                type: String,
                required: true,
            },
            description: String,
            price: {
                type: Number,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            tvOptions: {
                type: String,
                required: true,
            },
            image: String,
        },

        // Customer & Installation Details
        connectionType: {
            type: String,
            enum: ["Home", "Office"],
            required: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        municipality: {
            type: String,
        },

        tole: {
            type: String,
            required:true,
        },

        // Payment
        paymentMethod: {
            type: String,
            enum: ["COD", "Khalti", "Esewa", "CreditCard"],
            default: "COD",
        },

        // Order Status
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Installed", "Cancelled"],
            default: "Pending",
        },

        // Admin Note
        note: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, // createdAt & updatedAt
    }
);

const Booking = mongoose.model("Booking", orderSchema);

export default Booking;