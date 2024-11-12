import express from "express";
import { router as authRouter } from "./src/routes/authRoute";
import { router as productsRouter } from "./src/routes/productsRoute";
import { router as ordersRoute } from "./src/routes/ordersRoute";
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRoute);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
