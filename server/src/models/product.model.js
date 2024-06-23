import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    primaryImage: {
        type: String,
        require: true
    },
    secondaryImages: {
        type: [String],
        require: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    sale: {
        type: String,
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
}, { timestamps: true })

productSchema.plugin(mongooseAggregatePaginate)

export const Product = mongoose.model('Product', productSchema);