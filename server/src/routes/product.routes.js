import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import {
    addProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    addReview,
    getProductReviews,
    getAllProducts,
    getSaleProducts,
} from "../controllers/product.controller.js";

const router = Router();
router.use(verifyJwt);

router.route('/get-all-products').get(getAllProducts);

router.route('/get-sale-products').get(getSaleProducts);

router.route('/add-product').post(
    upload.fields([
        { name: 'primaryImage', maxCount: 1 },
        { name: 'secondaryImages', maxCount: 3 },
    ]),
    addProduct
);

router.route('/:productId')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

router.route('/review/:productId')
    .patch(addReview)
    .get(getProductReviews);

export default router;
