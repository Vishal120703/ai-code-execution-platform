import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRouter from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});