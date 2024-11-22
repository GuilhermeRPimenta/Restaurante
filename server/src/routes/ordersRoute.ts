import { Router } from "express";
import * as ordersController from "../controllers/ordersController";

const router = Router();

router.get("/:id", ordersController.getOrderById);
router.get("/", ordersController.getAllOrders);
router.post("/", ordersController.createOrder);
router.put("/:id", ordersController.updateOrderStatus);

export { router };
