import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    toggleWishlist
} from "../controllers/wishlist.controller.js";

const router = Router();

router.use(verifyJwt);

router.route('/toggle-wishlist').post(toggleWishlist);

export default router;
