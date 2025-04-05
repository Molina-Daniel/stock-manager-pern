import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

// Connect to the database
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Database connected"));
  } catch (error) {
    console.log(
      colors.white.bgRed.bold("Error connecting to the database"),
      error
    );
  }
}

connectDB();

const server = express();

server.use("/api/products", router);

export default server;
