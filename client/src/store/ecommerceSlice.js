import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    saleProducts: [{}],
    categories: [],
    allProducts: [],
    cartProducts: [],
    wishlistProducts: [],
}

const saleProductsSlice = createSlice({
    name: "ecommerce",
    initialState,
    reducers: {
        saleProductsReducer: (state, action) => {
            state.saleProducts = action.payload;
        },

        categoryReducer: (state, action) => {
            state.categories = action.payload;
        },

        allProductsReducer: (state, action) => {
            state.allProducts = action.payload;
        },

        addToCartReducer: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cartProducts.find(item => item.cartProduct._id === product._id);
            if (existingProduct) {
                existingProduct.cartProduct.quantity += product.quantity;
            } else {
                state.cartProducts.push({ cartProduct: product });
            }
        },

        removeFromCartReducer: (state, action) => {
            const productId = action.payload;
            state.cartProducts = state.cartProducts.filter(item => item.cartProduct._id !== productId);
        },

        updateCartQuantityReducer: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state.cartProducts.find(item => item.cartProduct._id === productId);
            if (existingProduct) {
                existingProduct.cartProduct.quantity = quantity;
            }
        },

        wishlistReducer: (state, action) => {
            state.wishlistProducts = action.payload;
        },
        
        removeFromWishlistReducer: (state, action) => {
            const productId = action.payload;
            state.wishlistProducts = state.wishlistProducts.filter(product => product._id !== productId);
        },
    }
})

export const {
    saleProductsReducer,
    categoryReducer,
    allProductsReducer,
    addToCartReducer,
    removeFromCartReducer,
    updateCartQuantityReducer,
    wishlistReducer,
    removeFromWishlistReducer
} = saleProductsSlice.actions;
export default saleProductsSlice.reducer;
