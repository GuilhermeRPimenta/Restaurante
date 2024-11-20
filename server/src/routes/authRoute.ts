import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();
router.post("/register", authController.registerUser);
router.get("/login/:email", authController.getUserByEmail);
router.put("/update/:id", authController.updateUser);

export { router };
