import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();
router.post("/register", authController.registerUser);
router.get("/:id", authController.getUserById);
router.put("/:id", authController.updateUser);

export { router };
