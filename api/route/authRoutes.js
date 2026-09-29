import express from "express";
import { validate } from "../../middleware/validate.js";
import { register, login } from "../controller/authController.js";
import { authSchema, loginSchema } from "../schemas/authSchema.js";

const router = express.Router();

router.post("/register", validate(authSchema), register );

router.post("/login", validate(loginSchema), login);

export default router;