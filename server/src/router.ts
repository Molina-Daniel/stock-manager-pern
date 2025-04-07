import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        description: The product ID.
 *        example: 1
 *      name:
 *        type: string
 *        description: The product name.
 *        example: Product 1
 *      price:
 *        type: number
 *        description: The product price.
 *        example: 300
 *      availability:
 *        type: boolean
 *        description: The product availability.
 *        example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Get all products
 *   tags:
 *    - Products
 *   description: Return a list of products
 *   responses:
 *    '200':
 *      description: Successful response
 *      content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Product'
 *
 *
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: Get a product by ID
 *   tags:
 *    - Products
 *   description: Return a product based on its unique ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID of the product to get
 *   responses:
 *    '200':
 *      description: Successful response
 *      content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Product'
 *    '404':
 *      description: Product not found
 *    '400':
 *      description: Bad Request - Invalid ID
 *
 *
 */
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
      .isFloat({ min: 0.01 })
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
    .isFloat({ min: 0.01 })
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
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("Not a valid ID"),
  handleInputErrors,
  deleteProduct
);

export default router;
