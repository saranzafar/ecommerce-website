import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware";
import {
    addProductToWishlist,
    removeProductFromWishlist
} from "../controllers/wishlist.controller";

const router = Router();

router.use(verifyJwt);

router.route('/wishlist')
    .post(addProductToWishlist);

router.route('/wishlist/:productId')
    .delete(removeProductFromWishlist);

export default router;
