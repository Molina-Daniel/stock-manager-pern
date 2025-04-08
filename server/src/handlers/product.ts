import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["id", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.status(200).json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.status(200).json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  await product.update(req.body); // This update method protects any field not sent on a PUT request
  res.status(200).json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  product.availability = !product.dataValues.availability;
  await product.save();
  res.status(200).json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  await product.destroy();
  res.status(200).json({ data: "Product deleted" });
};
