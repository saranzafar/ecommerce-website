import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {
    loginUser,
    registerUser,
    sendEmail,
    emailVerification,
    changePassword,
} from "../controllers/user.controller.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/verify-email').post(emailVerification)
router.route('/forget-password').post(sendEmail)

//secured routes
router.route('/change-password').post(verifyJwt, changePassword)

export default router