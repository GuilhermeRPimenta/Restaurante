import { Prisma } from "@prisma/client";
import prisma from "./prismaClient";
import e, { Response, Request } from "express";

const createOrder = async (req: Request, res: Response) => {
  try {
    if (
      !req.body.userId ||
      !req.body.products ||
      !Array.isArray(req.body.products)
    ) {
      res.status(400).json({ error: "Invalid object sent" });
      return;
    }
    if (req.body.products.length === 0) {
      res.status(400).json({ error: "Empty products array" });
      return;
    }
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: req.body.products.map((product) => product.productId),
        },
      },
    });
    if (products.length !== req.body.products.length) {
      const missingProductsIds: number[] = [];
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
    const unavailableProductsIds: number[] = [];
    const processedProductsIds: number[] = [];
    const repeatedProductsids: number[] = [];
    req.body.products.forEach((product) => {
      if (processedProductsIds.includes(product.productId)) {
        repeatedProductsids.push(product.productId);
      } else {
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
    const order = await prisma.order.create({
      data: {
        userId: req.body.userId,
        totalPrice: req.body.products.reduce((acc, product) => {
          const price = products.find((p) => p.id === product.productId).price;
          return acc + Number(price) * product.quantity;
        }, 0),
        status: "PENDENTE",
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        res.status(422).json({ error: error.message });
        return;
      }
    }
    res.status(500).json({ error: error.message });
    return;
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: error.message });
    return;
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });
    res.status(200).json(updatedOrder);
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(422).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: error.message });
    return;
  }
};
export { createOrder, getOrderById, updateOrderStatus };
