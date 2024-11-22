import { Prisma } from "@prisma/client";
import prisma from "./prismaClient";
import { Response, Request } from "express";

const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.body.name || req.body.name.length === 0) {
      res
        .status(400)
        .json({ errorCode: 2, error: "'name' field is empty or non existent" });
      return;
    }
    if (!req.body.category || req.body.category.length === 0) {
      res.status(400).json({
        errorCode: 3,
        error: "'category' field is empty or non existent",
      });
      return;
    }
    if (req.body.price === undefined || typeof req.body.price !== "number") {
      res
        .status(422)
        .json({ errorCode: 4, error: "Price is non existent or not a number" });
      return;
    }
    if (req.body.price < 0) {
      res.status(400).json({ errorCode: 5, error: "Negative price" });
      return;
    }
    if (req.body.imageUrl) {
      try {
        const imageUrlResponse = await fetch(req.body.imageUrl, {
          method: "HEAD",
        });
        if (!imageUrlResponse.ok) {
          res.status(422).json({ errorCode: 6, error: "Invalid URL" });
          return;
        }
        const urlContentType = imageUrlResponse.headers
          .get("Content-Type")
          ?.includes("image");
        if (!urlContentType) {
          res
            .status(422)
            .json({ errorCode: 7, error: "URL does not contains an image" });
          return;
        }
      } catch (e) {
        res.status(422).json({ errorCode: 8, error: "Invalid URL" });
        return;
      }
    }

    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json(product);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};

const getProducts = async (req: Request, res: Response) => {
  const { category, orderBy, orderDirection, maxPrice, minPrice } = req.query;
  const minPriceNum =
    minPrice && !isNaN(Number(minPrice)) ? Number(minPrice) : undefined;
  const maxPriceNum =
    maxPrice && !isNaN(Number(maxPrice)) ? Number(maxPrice) : undefined;
  try {
    const products = await prisma.product.findMany({
      where: {
        category: category ? String(category) : undefined,
        price: {
          ...(minPriceNum ? { gte: minPriceNum } : {}),
          ...(maxPriceNum ? { lte: maxPriceNum } : {}),
        },
      },
      orderBy: {
        [orderBy ? String(orderBy) : "category"]:
          orderDirection === "desc" ? "desc" : "asc",
      },
    });
    res.status(200).json(products);
    return;
  } catch (error) {
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!product) {
      res.status(404).json({ errorCode: 3, error: "Product not found" });
      return;
    }
    res.status(200).json(product);
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    if (!req.body.name || req.body.name.length === 0) {
      res
        .status(400)
        .json({ errorCode: 2, error: "'name' field is empty or non existent" });
      return;
    }
    if (!req.body.category || req.body.category.length === 0) {
      res.status(400).json({
        errorCode: 3,
        error: "'category' field is empty or non existent",
      });
      return;
    }
    if (req.body.price === undefined || typeof req.body.price !== "number") {
      res
        .status(422)
        .json({ errorCode: 4, error: "Price is non existent or not a number" });
      return;
    }
    if (req.body.price < 0) {
      res.status(400).json({ errorCode: 5, error: "Negative price" });
      return;
    }
    if (req.body.imageUrl) {
      try {
        const imageUrlResponse = await fetch(req.body.imageUrl, {
          method: "HEAD",
        });
        if (!imageUrlResponse.ok) {
          res.status(422).json({ errorCode: 6, error: "Invalid URL" });
          return;
        }
        const urlContentType = imageUrlResponse.headers
          .get("Content-Type")
          ?.includes("image");
        if (!urlContentType) {
          res
            .status(422)
            .json({ errorCode: 7, error: "URL does not contains an image" });
          return;
        }
      } catch (e) {
        res.status(422).json({ errorCode: 8, error: "Invalid URL" });
        return;
      }
    }
    const product = await prisma.product.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.status(200).json(product);
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).json({ errorCode: 9, error: "Product not found" });
      return;
    }
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).send();
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({ errorCode: 2, error: "Product not found" });
        return;
      }
      if (error.code === "P2003") {
        res.status(409).json({
          errorCode: 3,
          error:
            "Product cannot be deleted because is is associated with existing orders",
        });
        return;
      }
    }
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
