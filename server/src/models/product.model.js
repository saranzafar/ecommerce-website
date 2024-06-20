import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        require: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    rating: {
        type: [Number],
        require: false
    },
    reviews: {
        type: [String],
        require: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categorie"
    },
    isPublished: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

productSchema.plugin(mongooseAggregatePaginate)

export const Product = mongoose.model('Product', productSchema);