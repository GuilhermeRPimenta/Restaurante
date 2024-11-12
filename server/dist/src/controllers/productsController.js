"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("./prismaClient"));
const createProduct = async (req, res) => {
    try {
        if (typeof req.body.price !== "number") {
            res.status(422).json({ error: "Price is not a number" });
            return;
        }
        if (req.body.price < 0) {
            res.status(422).json({ error: "Negative price" });
            return;
        }
        if (req.body.imageUrl) {
            const imageUrlResponse = await fetch(req.body.imageUrl, {
                method: "HEAD",
            });
            if (!imageUrlResponse.ok) {
                res.status(422).json({ error: "Invalid URL" });
                return;
            }
            const urlContentType = imageUrlResponse.headers
                .get("Content-Type")
                ?.includes("image");
            if (!urlContentType) {
                res.status(422).json({ error: "URL does not contains an image" });
                return;
            }
        }
        const product = await prismaClient_1.default.product.create({
            data: req.body,
        });
        res.status(201).json(product);
        return;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message });
        return;
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const products = await prismaClient_1.default.product.findMany();
        res.status(200).json(products);
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        return;
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const product = await prismaClient_1.default.product.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.status(200).json(product);
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
exports.getProductById = getProductById;
