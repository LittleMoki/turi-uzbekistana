import {Router} from "express";
import {LoginUser, RegisterUser} from "../controller/AuthController.js";

const router = Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)

export default router