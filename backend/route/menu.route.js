import express from "express"
import { getMenu } from "../controller/menu.controll.js"

const router=express.Router()

router.get("/",getMenu)

export default router;