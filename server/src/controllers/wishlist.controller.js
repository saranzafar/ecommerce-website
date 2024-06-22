import { Wishlist } from "../models/wishlist.model";
import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse"; // Assuming you have this utility

const addProductToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming user ID is available from authenticated user

    if (!productId) {
        throw new apiError(401, "Product ID is required");
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = await Wishlist.create({ user: userId, products: [productId] });
    } else {
        if (wishlist.products.includes(productId)) {
            return res.status(200).json(
                new ApiResponse(200, "Product already in wishlist", wishlist)
            );
        }
        wishlist.products.push(productId);
        await wishlist.save();
    }

    return res.status(200).json(
        new ApiResponse(200, "Product added to wishlist successfully", wishlist)
    );
});

const removeProductFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id; // Assuming user ID is available from authenticated user

    if (!productId) {
        throw new apiError(401, "Product ID is required");
    }

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist || !wishlist.products.includes(productId)) {
        throw new apiError(404, "Product not found in wishlist");
    }

    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
    await wishlist.save();

    return res.status(200).json(
        new ApiResponse(200, "Product removed from wishlist successfully", wishlist)
    );
});

export {
    addProductToWishlist,
    removeProductFromWishlist
};
