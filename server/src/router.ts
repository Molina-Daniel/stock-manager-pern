import { Router } from "express";
import { createProduct } from "./handlers/product";

const router = Router();

router.get("/", (req, res) => {
  res.send("From GET");
});

router.post("/", createProduct);

export default router;
