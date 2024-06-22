import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {
    addProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
} from "../controllers/product.controller.js";

const router = Router()
router.use(verifyJwt)

router.route('/add-product')
    .post(
        upload.fields([
            {
                name: 'primaryImage',
                maxCount: 1
            },
            {
                name: 'secondaryImages',
                maxCount: 3
            },
        ]),
        addProduct
    )
router.route('/:productId')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

export default router