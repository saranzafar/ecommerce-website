import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    toggleWishlist,
    getWishlist,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.use(verifyJwt);

router.route('/toggle-wishlist').post(toggleWishlist);
router.route('/get-wishlist').get(getWishlist);

export default router;
