import { Wishlist } from "../models/wishlist.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

const toggleWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.body.user;
    if (!productId) {
        throw new apiError(401, "Product ID is required");
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = await Wishlist.create({ user: userId, products: [productId] });
        return res.status(200).json(
            new apiResponse(200, "Product added to wishlist successfully", wishlist)
        );
    }

    const productIndex = wishlist.products.indexOf(productId);

    if (productIndex === -1) {
        wishlist.products.push(productId);
        await wishlist.save();
        return res.status(200).json(
            new apiResponse(200, "Product added to wishlist successfully", wishlist)
        );
    } else {
        wishlist.products.splice(productIndex, 1);
        await wishlist.save();
        return res.status(203).json(
            new apiResponse(203, "Product removed from wishlist successfully", wishlist)
        );
    }
});

const getWishlist = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        throw new apiError(401, "User ID is required");
    }

    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');

    if (!wishlist) {
        return res.status(200).json(
            new apiResponse(200, "Wishlist is empty", [])
        );
    }

    return res.status(200).json(
        new apiResponse(200, "Wishlist retrieved successfully", wishlist.products)
    );
});

export {
    toggleWishlist,
    getWishlist,
};
