import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    addCategory,
    removeCategory,
    fetchAllCategories,
    addProductToCategory,
    removeProductFromCategory,
    getAllProductsInCategory,
    getCategoryById
} from "../controllers/categories.controller.js";

const router = Router();


router.route("/get-single-category/:categoryId").get(getCategoryById)
router.route('/category')
    .post(verifyJwt, addCategory)
    .get(fetchAllCategories);

router.route('/add-product')
    .post(verifyJwt, addProductToCategory);

router.route('/delete-category/:id')
    .delete(verifyJwt, removeCategory);

router.route('/category/:categoryId/products/:productId')
    .delete(verifyJwt, removeProductFromCategory);

router.route('/category/:categoryId/products')
    .get(getAllProductsInCategory);

export default router;
