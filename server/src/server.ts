import express from "express";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Connect to the database
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue.bold("Database connected"));
  } catch (error) {
    // console.log(error);
    console.log(colors.white.bgRed.bold("Error connecting to the database"));
  }
}
connectDB();

// Express instance
const server = express();

// Parse the body of the request
server.use(express.json());

// Use the router
server.use("/api/products", router);

// Swagger Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
