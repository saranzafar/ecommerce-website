import mongoose, { Schema } from "mongoose";


const categorieSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }],
}, { timestamps: true })


export const Category = mongoose.model('Category', categorieSchema);