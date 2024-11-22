import { Prisma } from "@prisma/client";
import prisma from "./prismaClient";
import { Response, Request } from "express";

const registerUser = async (req: Request, res: Response) => {
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
      res.status(400).json({
        errorCode: 4,
        error: "'address' field is empty or non existent",
      });
      return;
    }
    let phoneNumbers = "";
    if (req.body.phone) {
      const phone: String = req.body.phone;
      for (let i = 0; i < phone.length; i++) {
        if (!Number.isNaN(parseInt(phone[i])))
          phoneNumbers += parseInt(phone[i]);
      }
      if (
        (phoneNumbers[0] === "0" &&
          phoneNumbers.length !== 11 &&
          phoneNumbers.length !== 12) ||
        (phoneNumbers[0] !== "0" &&
          phoneNumbers.length !== 10 &&
          phoneNumbers.length !== 11)
      ) {
        res.status(400).json({ errorCode: 5, error: "Invalid phone" });
        return;
      }
    }
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: phoneNumbers,
      },
    });
    res.status(201).json(user);
    return;
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ errorCode: 6, error: "Email already registered" });
        return;
      }
      if (error.code === "P2000") {
        res
          .status(400)
          .json({ errorCode: 7, error: "One or more collumns are too long" });
        return;
      }
    }
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    });
    if (!user) {
      res.status(404).json({ errorCode: 3, error: "User not found" });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ errorCode: 2, error: error.message });
      return;
    }
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};

const updateUser = async (req: Request, res: Response) => {
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
      res.status(400).json({
        errorCode: 4,
        error: "'address' field is empty or non existent",
      });
      return;
    }
    let phoneNumbers = "";
    if (req.body.phone) {
      const phone: String = req.body.phone;
      for (let i = 0; i < phone.length; i++) {
        if (!Number.isNaN(parseInt(phone[i])))
          phoneNumbers += parseInt(phone[i]);
      }
      if (
        (phoneNumbers[0] === "0" &&
          phoneNumbers.length !== 11 &&
          phoneNumbers.length !== 12) ||
        (phoneNumbers[0] !== "0" &&
          phoneNumbers.length !== 10 &&
          phoneNumbers.length !== 11)
      ) {
        res.status(400).json({ errorCode: 5, error: "Invalid phone" });
        return;
      }
    }
    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: phoneNumbers,
      },
    });
    res.status(200).json(user);
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code === "P2000") {
        res
          .status(400)
          .json({ errorCode: 7, error: "One or more collumns are too long" });
        return;
      }
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ errorCode: 8, error: "Email already registered" });
        return;
      }
      if (error.code === "P2025") {
        res.status(404).json({ errorCode: 6, error: "User not found" });
        return;
      }
    }
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};

export { registerUser, updateUser, getUserByEmail };
