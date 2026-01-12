import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "List of product" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create a new product" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Get product with ID ${req.params.id}` });
});

export default router;
