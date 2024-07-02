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

router.use(verifyJwt); // Apply JWT verification to all routes

router.route("/get-single-category/:categoryId").get(getCategoryById)
router.route('/category')
    .post(addCategory)
    .get(fetchAllCategories);

router.route('/add-product')
    .post(addProductToCategory);

router.route('/delete-category/:id')
    .delete(removeCategory);

router.route('/category/:categoryId/products/:productId')
    .delete(removeProductFromCategory);

router.route('/category/:categoryId/products')
    .get(getAllProductsInCategory);

export default router;
