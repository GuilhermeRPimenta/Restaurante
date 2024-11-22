import { Prisma } from "@prisma/client";
import prisma from "./prismaClient";
import e, { Response, Request } from "express";

const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ errorCode: 2, error: "User not sent" });
      return;
    }
    if (
      !req.body.products ||
      !Array.isArray(req.body.products) ||
      req.body.products.length === 0
    ) {
      res
        .status(400)
        .json({ errorCode: 3, error: "Invalid products parameter" });
      return;
    }

    const processedProductsIds: number[] = [];
    const repeatedProductsIds: number[] = [];
    req.body.products.forEach((product) => {
      if (processedProductsIds.includes(product.productId)) {
        repeatedProductsIds.push(product.productId);
      } else {
        processedProductsIds.push(product.productId);
      }
    });

    if (repeatedProductsIds.length > 0) {
      res.status(400).json({
        errorCode: 4,
        error: `Products sent more than once: [${repeatedProductsIds
          .map((id) => id)
          .join(", ")}]`,
      });
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
        errorCode: 5,
        error: `Products ids [${missingProductsIds
          .map((id) => id)
          .join(", ")}] were not found`,
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
    res.status(201).json({ id: order.id });
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        res.status(422).json({ errorCode: 6, error: "User not found" });
        return;
      }
    }
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItem: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
    const formattedOrders = orders.map((order) => {
      const formattedOrder = {
        id: order.id,
        totalPrice: order.totalPrice,
        status: order.status,
        createdAt: order.createdAt,
        products: order.orderItem.map((o) => {
          return {
            name: o.product.name,
            quantity: o.quantity,
            price: o.product.price,
          };
        }),
      };
      return formattedOrder;
    });
    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ errorCode: 1, error: error.message });
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
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
    if (!order) {
      res.status(404).json({ errorCode: 3, error: "Order not found" });
      return;
    }
    const formattedOrder = {
      id: order.id,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
      products: order.orderItem.map((o) => {
        return {
          name: o.product.name,
          quantity: o.quantity,
          price: o.product.price,
        };
      }),
    };
    res.status(200).json(formattedOrder);
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
      res.status(404).json({ errorCode: 2, error: error.message });
      return;
    }
    res.status(500).json({ errorCode: 1, error: error.message });
    return;
  }
};
export { createOrder, getOrderById, getAllOrders, updateOrderStatus };
