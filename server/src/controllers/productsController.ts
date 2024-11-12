import { Prisma } from "@prisma/client";
import prisma from "./prismaClient";
import { Response, Request } from "express";

const createProduct = async (req: Request, res: Response) => {
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

    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json(product);
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: error.message });
    return;
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export { createProduct, getProducts };
