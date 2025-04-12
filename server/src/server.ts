import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
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

// Open Express instance
const server = express();

// Allow CORS connections
const whiteList = [process.env.CLIENT_URL];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error: Unauthorized domain"));
    }
  },
};
server.use(cors(corsOptions));

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
