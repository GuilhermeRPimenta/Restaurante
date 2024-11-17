"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = require("./src/routes/authRoute");
const productsRoute_1 = require("./src/routes/productsRoute");
const ordersRoute_1 = require("./src/routes/ordersRoute");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use("/api/auth", authRoute_1.router);
app.use("/api/products", productsRoute_1.router);
app.use("/api/orders", ordersRoute_1.router);
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
