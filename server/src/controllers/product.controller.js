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
    console.log(productId);
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


export {
    addProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
}