import express from "express";

import env from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import connectToDB from "./config/db.js";

const app = express();


app.use(express.json());
app.use(cookieParser());

env.config();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToDB();
  console.log(`running on ${PORT}`);
});
