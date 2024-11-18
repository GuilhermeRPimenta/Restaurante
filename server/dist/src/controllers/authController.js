"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("./prismaClient"));
const registerUser = async (req, res) => {
    try {
        if (!req.body.name || req.body.name.length === 0) {
            res
                .status(400)
                .json({ errorCode: 2, error: "'name' field is empty or non existent" });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            res.status(400).json({ errorCode: 3, error: "Invalid email" });
            return;
        }
        if (!req.body.address || req.body.address.length === 0) {
            res
                .status(400)
                .json({
                errorCode: 4,
                error: "'address' field is empty or non existent",
            });
            return;
        }
        let phoneNumbers = "";
        if (req.body.phone) {
            const phone = req.body.phone;
            for (let i = 0; i < phone.length; i++) {
                if (!Number.isNaN(parseInt(phone[i])))
                    phoneNumbers += parseInt(phone[i]);
            }
            if (phoneNumbers.length !== 10 && phoneNumbers.length !== 11) {
                res.status(400).json({ errorCode: 5, error: "Invalid phone" });
                return;
            }
        }
        const user = await prismaClient_1.default.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                phone: phoneNumbers,
            },
        });
        res.status(201).json(user);
        return;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                res
                    .status(409)
                    .json({ errorCode: 6, error: "Email already registered" });
                return;
            }
        }
        res.status(500).json({ errorCode: 1, error: error.message });
        return;
    }
};
exports.registerUser = registerUser;
