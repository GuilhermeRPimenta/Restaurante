import express from "express";
import cors from "cors";
import { router as authRouter } from "./src/routes/authRoute";
import { router as productsRouter } from "./src/routes/productsRoute";
import { router as ordersRoute } from "./src/routes/ordersRoute";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRoute);

app.listen(process.env.SERVER_PORT || 8000, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT || 8000}`);
});
