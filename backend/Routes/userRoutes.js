import { Router } from "express";
import { adminLogin, adminregister, adminLogout } from "../Controllers/userCrontroller.js";

const router = Router();

router.route("/register").post(adminregister);
router.route("/login").post(adminLogin);

// This would be a protected route in a real app
router.route("/logout").post(adminLogout);

export default router;