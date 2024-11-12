"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("./prismaClient"));
const registerUser = async (req, res) => {
    try {
        const emailParts = req.body.email.split("@");
        if (emailParts.length !== 2) {
            res.status(400).json({ error: "Invalid email" });
            return;
        }
        if (!emailParts[1].includes(".")) {
            res.status(400).json({ error: "Invalid email" });
            return;
        }
        if (req.body.phone) {
            const phone = req.body.phone;
            let phoneNumbers = "";
            for (let i = 0; i < phone.length; i++) {
                phoneNumbers += phone[i];
            }
            if (phoneNumbers.length !== 10 && phoneNumbers.length !== 11) {
                res.status(400).json({ error: "Invalid email" });
            }
        }
        await prismaClient_1.default.user.create({
            data: req.body,
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                res.status(409).json({ error: error.message });
            }
        }
        res.status(500).json({ error: error.message });
    }
};
