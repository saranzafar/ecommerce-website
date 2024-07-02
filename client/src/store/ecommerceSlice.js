import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    saleProducts: [{}],
    categories: [],
}

const saleProductsSlice = createSlice({
    name: "ecommerce",
    initialState,
    reducers: {
        saleProductsReducer: (state, action) => {
            const data = {
                products: action.payload,
            }

            state.saleProducts.push(data)
        },
        categoryReducer: (state, action) => {
            const data = {
                products: action.payload,
            }

            state.categories.push(data)
        },
        // logout: (state) => {
        //     state.userData.push(null)

        // },
    }
})

export const { saleProductsReducer, categoryReducer } = saleProductsSlice.actions
export default saleProductsSlice.reducer