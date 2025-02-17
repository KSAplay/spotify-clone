import { Router } from "express";

const router = Router();

router.get("/like", (req, res) => {
  req.auth.userId;
  res.send("Hello World, user route with GET method");
});

export default router;
