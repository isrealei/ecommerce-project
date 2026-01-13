import express, { json } from "express";
import productsRoutes from "./routes/products";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
