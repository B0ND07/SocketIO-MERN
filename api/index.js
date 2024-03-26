import express from "express";

import env from "dotenv";

import authRoutes from "./routes/authRoute.js";
import connectToDB from "./config/db.js";

const app = express();

app.use(express.json())

env.config();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToDB();
  console.log(`running on ${PORT}`);
});
