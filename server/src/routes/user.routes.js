import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {
    loginUser,
    registerUser,
    sendEmail,
    emailVerification,
    changePassword,
    refreshAccessToken,
    logoutUser,
} from "../controllers/user.controller.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/verify-email').patch(emailVerification)
router.route('/forget-password').post(sendEmail)

//secured routes
router.route('/change-password').patch(verifyJwt, changePassword)
router.route('/refresh-token').post(verifyJwt, refreshAccessToken)
router.route('/logout').post(verifyJwt, logoutUser)

export default router