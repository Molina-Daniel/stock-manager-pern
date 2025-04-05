import { Router } from "express";
import { body } from "express-validator";
import { createProduct, getProducts } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);

router.post(
  "/",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number")
      .isFloat({ min: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  handleInputErrors,
  createProduct
);

export default router;
