import express from "express";
import { Login, Logout, Register } from "../controllers/authController.js";

const router=express.Router()

router.post("/login",Login)
router.post("/register",Register)
router.post("/logout",Logout)


export default router