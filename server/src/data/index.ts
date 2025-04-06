import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("DB cleared successfully");
    exit();
  } catch (error) {
    console.log("Error clearing DB", error);
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}
