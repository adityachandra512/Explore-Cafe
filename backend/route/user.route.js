import express from "express";
import { login, signup, getAllUsers, updateUser, deleteUser } from "../controller/user.controller.js";

const router = express.Router()

// Add validation middleware
router.post("/signup", signup)
router.post("/login", login)
router.get("/", getAllUsers)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router;
