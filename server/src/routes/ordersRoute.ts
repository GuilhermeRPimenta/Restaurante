import { Router } from "express";
import * as ordersController from "../controllers/ordersController";

const router = Router();

router.get("/:id", ordersController.getOrderById);
router.post("/", ordersController.createOrder);
router.put("/:id", ordersController.updateOrderStatus);

export { router };
