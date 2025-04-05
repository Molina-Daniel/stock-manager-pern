import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("Not a valid ID"),
  handleInputErrors,
  getProductById
);

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

router.put(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("Not a valid ID"),
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
  body("availability")
    .isBoolean()
    .withMessage("Availability must be true or false"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("Not a valid ID"),
  updateAvailability
);

export default router;
