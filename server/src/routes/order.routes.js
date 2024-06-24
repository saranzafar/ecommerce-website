import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {
    placeOrder,
    changeOrderStatus
} from "../controllers/order.controller.js";

const router = Router()
router.use(verifyJwt)

router.route('/place-order').post(placeOrder)
router.route('/order-status').post(changeOrderStatus)

export default router