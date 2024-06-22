import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware";
import {
    addCategory,
    removeCategory,
    fetchAllCategories,
    addProductToCategory,
    removeProductFromCategory,
    getAllProductsInCategory
} from "../controllers/categories.controller.js";

const router = Router();

router.use(verifyJwt); // Apply JWT verification to all routes

router.route('/categories')
    .post(addCategory)
    .get(fetchAllCategories);

router.route('/categories/add-product')
    .post(addProductToCategory);

router.route('/categories/:id')
    .delete(removeCategory);

router.route('/categories/:categoryId/products/:productId')
    .delete(removeProductFromCategory);

router.route('/categories/:categoryId/products')
    .get(getAllProductsInCategory);

export default router;
