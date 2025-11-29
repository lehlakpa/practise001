import { Router } from "express";
import { userLogin } from "../Controllers/userCrontroller.js";

const router = Router();

router.route("/login").post(userLogin);

export default router;
