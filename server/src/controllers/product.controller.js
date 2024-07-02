import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js"
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";


const addProduct = asyncHandler(async (req, res) => {
    const { name, description, price, sale, quantity, category } = req.body;
    if (!name || !description || !price || !quantity || !category) {
        throw new apiError(403, "Please provide all required fields");
    }

    // Check for primary image
    const primaryImageLocalPath = req.files?.primaryImage?.[0]?.path;
    if (!primaryImageLocalPath) {
        throw new apiError(400, "Primary Image is required");
    }

    // Check for secondary images
    const secondaryImagesLocalPaths = req.files?.secondaryImages?.map(file => file.path) || [];
    // Upload primary image to cloudinary
    const primaryImageUpload = await uploadOnCloudinary(primaryImageLocalPath);
    if (!primaryImageUpload) {
        throw new apiError(400, "Failed to upload primary image");
    }

    // Upload secondary images to cloudinary
    const secondaryImagesUploads = await Promise.all(
        secondaryImagesLocalPaths.map(async (path) => await uploadOnCloudinary(path))
    );

    // Prepare the image URLs
    const primaryImageUrl = primaryImageUpload.url;
    const secondaryImagesUrls = secondaryImagesUploads.map(upload => upload.url);

    // Create product object and save to DB
    const product = await Product.create({
        name,
        description,
        price,
        sale,
        quantity,
        category,
        primaryImage: primaryImageUrl,
        secondaryImages: secondaryImagesUrls
    });

    if (!product) {
        throw new apiError(500, "Something went wrong while adding the product");
    }

    return res.status(201).json(
        new apiResponse(200, "Product added successfully", product)
    );
});

const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, sale, quantity } = req.body;
    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
        throw new apiError(404, "Product not found");
    }

    // Update product fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (sale !== undefined) product.sale = sale;
    if (quantity) product.quantity = quantity;

    // Save the updated product
    const updatedProduct = await product.save();

    return res.status(200).json(
        new apiResponse(200, "Product updated successfully", updatedProduct)
    );
});

const getSingleProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params

    const product = await Product.findById(productId);
    if (!product) {
        throw new apiError(404, "Product not found");
    }

    return res.status(200).json(
        new apiResponse(200, product, "Product Fetched successfully")
    );
})

const getAllProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values for pagination

    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(Number(limit));
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    if (products.length === 0) {
        throw new apiError(404, "No products found");
    }

    return res.status(200).json(
        new apiResponse(200, { products, totalPages, currentPage: Number(page) }, "Products fetched successfully")
    );
})

const getSaleProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values for pagination
    const skip = (page - 1) * limit;
    
    // Populate the 'category' field with only 'name' and '_id'
    const saleProducts = await Product.find({ sale: { $exists: true, $ne: "" } })
        .skip(skip)
        .limit(Number(limit))
        .populate({ path: 'category', select: 'name _id' }); // Populate specific fields

    const totalSaleProducts = await Product.countDocuments({ sale: { $exists: true, $ne: "" } });
    const totalPages = Math.ceil(totalSaleProducts / limit);

    if (saleProducts.length === 0) {
        throw new apiError(404, "No sale products found");
    }

    return res.status(200).json(
        new apiResponse(200, { saleProducts, totalPages, currentPage: Number(page) }, "Sale products fetched")
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params; // Assuming the product ID is passed as a URL parameter

    // Find the product by ID
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
        throw new apiError(404, "Product not found");
    }


    // Delete images from Cloudinary
    // if (product.primaryImage) {
    //     await cloudinary.uploader.destroy(product.primaryImage.public_id);
    // }
    // if (product.secondaryImages && product.secondaryImages.length > 0) {
    //     await Promise.all(
    //         product.secondaryImages.map(async (image) => {
    //             await cloudinary.uploader.destroy(image.public_id);
    //         })
    //     );
    // }

    // Delete the product
    // await product.remove();

    return res.status(200).json(
        new apiResponse(200, "Product deleted successfully")
    );
});

const addReview = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { text, rating } = req.body;

    if (!text || !rating) {
        throw new apiError(400, "Review text and rating are required");
    }

    if (rating < 1 || rating > 5) {
        throw new apiError(400, "Rating must be between 1 and 5");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new apiError(404, "Product not found");
    }

    const review = {
        user: req.user._id,
        text,
        rating
    };

    product.reviews.push(review);
    const savedReview = await product.save();

    return res.status(201).json(new apiResponse(201, savedReview, "Review added successfully"));
});

const getProductReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate('reviews.user', 'name'); // Assuming 'name' is a field in the User schema

    if (!product) {
        throw new apiError(404, "Product not found");
    }

    return res.status(200).json(new apiResponse(200, product.reviews, "Reviews fetched successfully"));
});

export {
    addProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    addReview,
    getProductReviews,
    getAllProducts,
    getSaleProducts,
}