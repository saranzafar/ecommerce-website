import { Category } from "../models/categorie.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js"; // Assuming you have this utility

const addCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        throw new apiError(401, "Category name is required");
    }

    const createdCategory = await Category.create({ name });
    if (!createdCategory) {
        throw new apiError(501, "Error occurred while creating the Category");
    }

    return res.status(201).json(
        new apiResponse(201, "Category added successfully", createdCategory)
    );
});

const addProductToCategory = asyncHandler(async (req, res) => {
    const { name, productId } = req.body;
    if (!name || !productId) {
        throw new apiError(401, "Category name and Product ID are required");
    }

    try {
        const availableCategory = await Category.findOne({ name });
        if (!availableCategory) {
            throw new apiError(404, "Category not found");
        }

        // Check if the productId already exists in the category
        if (availableCategory.products?.includes(productId)) {
            return res.status(200).json(
                new apiResponse(200, availableCategory, "Product already exists in Category")
            );
        }

        // Add the productId to the products array
        availableCategory.products.push(productId);
        await availableCategory.save();

        return res.status(200).json(
            new apiResponse(200, availableCategory, "Product added to Category")
        );

    } catch (error) {
        // Handle any potential errors
        if (error instanceof apiError) {
            return res.status(error.statusCode).json(
                new apiResponse(error.statusCode, null, error.message)
            );
        } else {
            return res.status(500).json(
                new apiResponse(500, null, "Error while adding product to Category")
            );
        }
    }
});

const removeCategory = asyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming the category ID is passed as a URL parameter

    // Find the category by ID
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new apiError(404, "Category not found");
    }

    return res.status(200).json(
        new apiResponse(200, "Category removed successfully")
    );
});

const removeProductFromCategory = asyncHandler(async (req, res) => {
    const { categoryId, productId } = req.params;

    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new apiError(404, "Category not found");
    }

    // Check if the product exists in the category
    const productIndex = category.products.indexOf(productId);
    if (productIndex === -1) {
        throw new apiError(404, "Product not found in this category");
    }

    // Remove the product from the category
    category.products.splice(productIndex, 1);
    await category.save();

    return res.status(200).json(
        new apiResponse(200, "Product removed from category successfully", category)
    );
});

const fetchAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().populate('products');
    //also fetch documents which relate to this document (populate)

    if (!categories) {
        throw new apiError(404, "No categories found");
    }

    return res.status(200).json(
        new apiResponse(200, "Categories fetched successfully", categories)
    );
});

const getAllProductsInCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { limit = 20, sortType = 'asc' } = req.query;
    const page = parseInt(req.query.page) || 0; // Ensure `page` is an integer
    const sortDirection = sortType === 'asc' ? 1 : -1; // Ensure sorting direction is correct

    try {
        const category = await Category.findById(categoryId).populate({
            path: 'products',
            options: {
                sort: { createdAt: sortDirection },
                skip: page * limit,
                limit: parseInt(limit) // Ensure `limit` is an integer
            }
        });

        if (!category) {
            return res.status(404).json({
                status: 404,
                message: "Category not found",
            });
        }

        if (category.products.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No products found in this category",
            });
        }

        return res.status(200).json({
            status: 200,
            products: category.products,
            message: "Products fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occurred while fetching products",
            error: error.message,
        });
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    // const category = await Category.findById(categoryId).populate('products');
    const category = await Category.findById(categoryId)
    if (category) {
        return res.status(200).json({ status: 200, message: "Category Fetched", category });
    }
    else {
        return res.status(404).json({ status: 404, message: "Category not found", });
    }
})


export {
    addCategory,
    addProductToCategory,
    removeCategory,
    removeProductFromCategory,
    fetchAllCategories,
    getAllProductsInCategory,
    getCategoryById,
};
