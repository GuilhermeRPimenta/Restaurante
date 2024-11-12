"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("./prismaClient"));
const createOrder = async (req, res) => {
    try {
        const products = await prismaClient_1.default.product.findMany({
            where: {
                id: {
                    in: req.body.products.map((product) => product.productId),
                },
            },
        });
        if (products.length !== req.body.products.length) {
            const missingProductsIds = [];
            req.body.products.forEach((bodyProduct) => {
                if (!products.some((p) => p.id === bodyProduct.productId)) {
                    missingProductsIds.push(bodyProduct.productId);
                }
            });
            res.status(404).json({
                error: `Products ids [${missingProductsIds
                    .map((id) => id)
                    .join(", ")}] were not found`,
            });
            return;
        }
        const unavailableProductsIds = [];
        const processedProductsIds = [];
        const repeatedProductsids = [];
        req.body.products.forEach((product) => {
            if (processedProductsIds.includes(product.productId)) {
                repeatedProductsids.push(product.productId);
            }
            else {
                processedProductsIds.push(product.productId);
            }
            if (product.quantity === 0) {
                unavailableProductsIds.push(product.productId);
            }
        });
        if (repeatedProductsids.length > 0) {
            res.status(400).json({
                error: `Products sent more than once: [${repeatedProductsids
                    .map((id) => id)
                    .join(", ")}]`,
            });
            return;
        }
        if (unavailableProductsIds.length > 0) {
            res.status(400).json({
                error: `Unavailable products: [${unavailableProductsIds
                    .map((id) => id)
                    .join(", ")}]`,
            });
            return;
        }
        const order = await prismaClient_1.default.order.create({
            data: {
                userId: req.body.userId,
                totalPrice: req.body.products.reduce((acc, product) => {
                    const price = products.find((p) => p.id === product.productId).price;
                    return acc + Number(price) * product.quantity;
                }, 0),
                status: "Pendente",
                orderItem: {
                    createMany: {
                        data: req.body.products.map((product) => ({
                            quantity: product.quantity,
                            productId: product.productId,
                        })),
                    },
                },
            },
        });
        res.status(200).send(order);
        return;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(422).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message });
        return;
    }
};
exports.createOrder = createOrder;
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
