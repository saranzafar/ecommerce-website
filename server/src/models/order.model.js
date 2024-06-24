import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const orderSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        productdetails: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true
        },
    },],
    totalprice: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancel"],
        default: "pending"
    },

}, { timestamps: true })

orderSchema.plugin(mongooseAggregatePaginate)
export const Order = mongoose.model('Order', orderSchema);