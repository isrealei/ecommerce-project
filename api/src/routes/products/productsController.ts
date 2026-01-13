import { Request, Response } from "express";

export const listProducts = (req: Request, res: Response) => {
  res.json({ message: "List of product" });
};

export const getProductById = (req: Request, res: Response) => {
  res.json({ message: `Get product with ID ${req.params.id}` });
};

export const createProduct = (req: Request, res: Response) => {
  res.json({ message: "Create a new product" });
};

export const updateProduct = (req: Request, res: Response) => {
  res.json({ message: "product updated" });
};

export const deleteProduct = (req: Request, res: Response) => {
  res.json({ message: "product deleted" });
};
