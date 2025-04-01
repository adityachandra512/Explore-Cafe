import express from "express"
import { getMenu, addMenuItem, deleteMenuItem, updateMenuItem } from "../controller/menu.controll.js"

const router = express.Router()

router.get("/", getMenu)
router.post("/add", addMenuItem)
router.put("/:id", updateMenuItem)  // Make sure this line is before delete route
router.delete("/:id", deleteMenuItem)

export default router;