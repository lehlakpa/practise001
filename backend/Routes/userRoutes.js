import { Router } from "express";
import { adminLogin, adminregister,editUpload,getpackages,deleteUpload, adminLogout, deleteBooking, updateBooking, adminupload, adminChangepassword, getBookings, getBookingById, createBooking, getAdmin } from "../Controllers/userCrontroller.js";
import { authMiddleware } from "../Middleware/authmiddleware.js";
import { refreshaccesstoken } from "../Controllers/userCrontroller.js";
import { upload } from "../Middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(adminregister);
router.route("/login").post(adminLogin);
router.route("/getuser").get(authMiddleware, getAdmin);
// This would be a protected route in a real app
router.route("/logout").post(authMiddleware, adminLogout);
router.route("/refresh-token").post(refreshaccesstoken);
router.route("/change-password").post(authMiddleware, adminChangepassword);
//router.route("/change-username").put(authMiddleware, adminChangeUsername);

router.route("/upload").post(
    upload.fields([
        {
            name: "images",
            maxCount: 5
        }
    ]),
    authMiddleware,adminupload
);
router.route("/products/:id").delete(authMiddleware, deleteUpload);
router.route("/products/:id").put(
    upload.fields([
        {
            name: "images",
            maxCount: 5
        }
    ]),
    authMiddleware, editUpload);
router.route("/bookings").post(createBooking);
router.route("/getbookings").get(getBookings);
router.route("/bookings/:id").delete(deleteBooking);
router.route("/bookings/:id").get(getBookingById);
router.route("/bookings/:id").put(updateBooking);
router.route("/packages").get(getpackages);


export default router;