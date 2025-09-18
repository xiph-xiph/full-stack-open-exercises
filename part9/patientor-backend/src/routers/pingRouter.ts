import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("receiving ping");
  res.send("pong");
});

export default router;
