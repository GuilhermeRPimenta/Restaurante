import express from "express";
import { router as authRouter } from "./src/routes/authRoute";

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
