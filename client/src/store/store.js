import { configureStore } from "@reduxjs/toolkit";
import ecommerceSlice from "./ecommerceSlice";

const store = configureStore({
    reducer: {
        ecommerce: ecommerceSlice
    }
})

export default store