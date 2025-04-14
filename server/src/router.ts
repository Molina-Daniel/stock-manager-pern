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
 *      description: ID of the product to retrieve
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

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Create a new product in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Product 1"
 *              price:
 *                type: number
 *                example: 300
 *              availability:
 *                type: boolean
 *                example: true
 *            required:
 *              - name
 *              - price
 *    responses:
 *      '201':
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      '400':
 *        description: Bad Request - Invalid input data
 */
router.post(
  "/",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 1 })
      .withMessage("Name must be at least 3 characters long"),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number")
      .isFloat({ min: 0.01 })
      .withMessage("Price must be greater than 0")
      .custom((value) => {
        const strValue = value.toString();
        const decimalParts = strValue.split(".");

        if (decimalParts.length > 1 && decimalParts[1].length > 2) {
          throw new Error("Price cannot have more than 2 decimal places");
        }
        return true;
      }),
  ],
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product by ID
 *    tags:
 *      - Products
 *    description: Update a product based on its unique ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the product to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Product 1"
 *              price:
 *                type: number
 *                example: 300
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      '200':
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      '404':
 *        description: Product not found
 *      '400':
 *        description: Bad Request - Invalid ID or input data
 */
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
    .withMessage("Price must be greater than 0")
    .custom((value) => {
      const strValue = value.toString();
      const decimalParts = strValue.split(".");

      if (decimalParts.length > 1 && decimalParts[1].length > 2) {
        throw new Error("Price cannot have more than 2 decimal places");
      }
      return true;
    }),
  body("availability")
    .isBoolean()
    .withMessage("Availability must be true or false"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update product availability by ID
 *    tags:
 *      - Products
 *    description: Update product availability based on its unique ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the product to update availability
 *    responses:
 *      '200':
 *        description: Product availability updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      '404':
 *        description: Product not found
 *      '400':
 *        description: Bad Request - Invalid ID
 */
router.patch(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("Not a valid ID"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by ID
 *    tags:
 *      - Products
 *    description: Returns a confirmation message after deleting a product
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the product to delete
 *    responses:
 *      '200':
 *        description: Product deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: "Product deleted"
 *      '404':
 *        description: Product not found
 *      '400':
 *        description: Bad Request - Invalid ID
 */
router.delete(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("Not a valid ID"),
  handleInputErrors,
  deleteProduct
);

export default router;
