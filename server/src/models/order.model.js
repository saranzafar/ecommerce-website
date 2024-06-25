import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const orderSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true
        },
    }],
    totalprice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancel"],
        default: "pending"
    },
    address: {
        type: String,
        required: true
    }

}, { timestamps: true });

orderSchema.plugin(mongooseAggregatePaginate);
export const Order = mongoose.model('Order', orderSchema);
