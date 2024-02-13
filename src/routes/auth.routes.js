import { Router } from "express"
import * as auth from "../controllers/auth.controller.js"
import {authRequired} from "../middlewares/validateToken.js"

const router = Router()

router.post("/register", auth.register)
router.post("/login", auth.login)
router.post("/logout", authRequired ,auth.logout)
router.get("/verify-token", auth.verifyToken)

export default router
