import { Prisma } from "@prisma/client";
import prisma from "./prismaClient";
import { Response, Request } from "express";

const registerUser = async (req: Request, res: Response) => {
  try {
    const emailParts: string[] = req.body.email.split("@");
    if (emailParts.length !== 2) {
      res.status(400).json({ error: "Invalid email" });
      return;
    }
    if (!emailParts[1].includes(".")) {
      res.status(400).json({ error: "Invalid email" });
      return;
    }
    if (req.body.phone) {
      const phone: String = req.body.phone;
      let phoneNumbers = "";
      for (let i = 0; i < phone.length; i++) {
        if (!Number.isNaN(Number(phone[i]))) phoneNumbers += phone[i];
      }
      if (phoneNumbers.length !== 10 && phoneNumbers.length !== 11) {
        res.status(400).json({ error: "Invalid phone" });
        return;
      }
    }
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(user);
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(409).json({ error: error.message });
        return;
      }
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: error.message });
    return;
  }
};

export { registerUser };
