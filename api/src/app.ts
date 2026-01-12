import express, { Router } from "express";
import productsRoutes from "./routes/products";

const app = express();
const PORT = process.env.PORT || 4000;

const router = Router();

app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
