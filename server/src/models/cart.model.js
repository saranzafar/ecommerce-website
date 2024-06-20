import mongoose, { Schema } from "mongoose";


const cartSchema = new Schema({
    products: [{
        productdetails: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true
        },
    }],
}, { timestamps: true })


export const Cart = mongoose.model('Cart', cartSchema);