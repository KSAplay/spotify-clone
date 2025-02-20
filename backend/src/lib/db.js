import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Conectado a MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error("La conexión a la base de datos falló", error);
    process.exit(1); // 1 => error, 0 => success
  }
};
