import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from "path";

import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import songRoutes from "./routes/song.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statRoutes from "./routes/stat.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse json bodies
app.use(clerkMiddleware()); // this will add the auth object to the request object => req.auth
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Error Interno del Servidor"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor está corriendo en el puerto ${PORT}`);
  connectDB();
});
