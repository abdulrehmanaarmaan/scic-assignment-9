import express from "express";
import cors from "cors";
import productRoutes from "./products";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
