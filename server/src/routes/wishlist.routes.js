import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    addProductToWishlist,
    removeProductFromWishlist
} from "../controllers/wishlist.controller.js";

const router = Router();

router.use(verifyJwt);

router.route('/add-product')
    .post(addProductToWishlist);

router.route('/remove-product/:productId')
    .delete(removeProductFromWishlist);

export default router;
