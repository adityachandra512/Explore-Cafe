import express from "express";
import { login, signup, getAllUsers, updateUser, deleteUser } from "../controller/user.controller.js";

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/", getAllUsers)  // Changed from "/admin" to "/" to match frontend
router.put("/:id", updateUser)    // Add this route for updating users
router.delete("/:id", deleteUser) // Add this route for deleting users

export default router;
