import mongoose, { Schema } from "mongoose";


const categorieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }],
}, { timestamps: true })


export const Categorie = mongoose.model('Categorie', categorieSchema);