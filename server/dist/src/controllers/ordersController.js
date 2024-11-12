"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("./prismaClient"));
const getOrderById = async (req, res) => {
    try {
        const order = await prismaClient_1.default.order.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                orderItem: {
                    select: {
                        quantity: true,
                        product: true,
                    },
                },
            },
        });
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(200).json(order);
        return;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message });
        return;
    }
};
exports.getOrderById = getOrderById;
