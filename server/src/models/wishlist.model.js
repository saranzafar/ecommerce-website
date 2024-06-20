import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const wishlistSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }],
}, { timestamps: true })

wishlistSchema.plugin(mongooseAggregatePaginate)

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);