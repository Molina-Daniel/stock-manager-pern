import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating product" });
  }
};
