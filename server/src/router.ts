import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("From GET");
});

export default router;
