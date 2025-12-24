import { Router } from "express";
import { adminLogin, adminregister, adminLogout,deleteBooking, updateBooking, adminupload, adminChangepassword, getBokings, getBookingById, Booking1, getAdmin } from "../Controllers/userCrontroller.js";
import { authMiddleware } from "../MIddleware/authmiddleware.js";
import { refreshaccesstoken } from "../Controllers/userCrontroller.js";

const router = Router();

router.route("/register").post(adminregister);
router.route("/login").post(adminLogin);
router.route("/getuser").get(authMiddleware,getAdmin);
// This would be a protected route in a real app
router.route("/logout").post(authMiddleware,adminLogout);
router.route("/refresh-token").post(refreshaccesstoken);
router.route("/change-password").post(authMiddleware,adminChangepassword);
router.route("/upload").post(authMiddleware,adminupload);

router.route("/bookings").post(Booking1);
router.route("/getbookings").get(getBokings);
router.route("/bookings/:id").delete(deleteBooking);
router.route("/bookings/:id").get(getBookingById);
router.route("/bookings/:id").put(updateBooking);


export default router;