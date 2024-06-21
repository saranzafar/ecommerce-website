import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {
    loginUser,
    registerUser,
    emailVerification
} from "../controllers/user.controller.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/verify-email').post(emailVerification)

//secured routes

export default router