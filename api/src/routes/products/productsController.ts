import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import db from "../../db";
import { productTable } from "../../db/schema";

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productTable);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, productId))
      .limit(1);
    if (product.length === 0) {
      res.status(404).json({ error: "Product not found" });
    }
    res.json(product[0]);
  } catch (err) {
    console.error("Error getting product:", err);
    res.status(500).json({ error: "Failed to get product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity, image_url } = req.body;
    const [product] = await db
      .insert(productTable)
      .values({
        name,
        description,
        image_url,
        price,
        quantity,
      })
      .returning({ id: productTable.id });
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, productId));
    if (product.length === 0) {
      res.status(404).json({ error: "Product not found" });
    }
    const { name, description, price, quantity, image_url } = req.body;
    await db
      .update(productTable)
      .set({ name, description, price, quantity, image_url })
      .where(eq(productTable.id, productId));
    return res.status(200).json({ message: "product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, productId));
    if (product.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    await db.delete(productTable).where(eq(productTable.id, productId));
    return res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
  }
};
