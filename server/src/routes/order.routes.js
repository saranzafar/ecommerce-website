import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {
    placeOrder,
    changeOrderStatus,
    getOrder,
} from "../controllers/order.controller.js";

const router = Router()
router.use(verifyJwt)

router.route('/place-order').post(placeOrder)
router.route('/get-order').get(getOrder)
router.route('/order-status').patch(changeOrderStatus)

export default router