import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World, user route with GET method");
});

export default router;
