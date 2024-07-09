import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../utils/sendMail.js";
import { startSession } from 'mongoose';

const placeOrder = asyncHandler(async (req, res) => {
    const { products, totalprice, address } = req.body;
    console.log("USER = ", req.user._id);
    if (!products || !totalprice) {
        throw new apiError(403, "All Fields are required");
    }

    const session = await startSession();
    session.startTransaction();

    try {
        // Create order
        const order = await Order.create([{
            buyer: req.user._id,
            products,
            totalprice,
            address,
            status: "pending"
        }], { session });

        // Decrease product quantities
        const bulkOps = products.map(({ productId, quantity }) => ({
            updateOne: {
                filter: { _id: productId },
                update: { $inc: { quantity: -quantity } }
            }
        }));

        await Product.bulkWrite(bulkOps, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json(
            new apiResponse(200, "Order placed successfully", order[0])
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new apiError(500, "Error placing order and updating product quantities");
    }
});
const getOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const order = await Order.find({ buyer: req.user._id }).select("")
    if (!order) {
        return res.status(200).json(
            new apiResponse(200, {}, "No Order Found")
        );
    }

    return res.status(200).json(
        new apiResponse(200, order, "Order History Fetched")
    );
})

const changeOrderStatus = asyncHandler(async (req, res) => {
    const { orderStatus, orderId } = req.body;

    const session = await startSession();
    session.startTransaction();

    try {
        const order = await Order.findById(orderId).session(session);
        if (!order) {
            throw new apiError(404, "Order not found");
        }

        if (orderStatus === "approved" || orderStatus === "approve") {
            order.status = "shipped";

            // Perform bulk updates for product quantities
            const bulkOps = order.products.map(({ productId, quantity }) => ({
                updateOne: {
                    filter: { _id: productId },
                    update: { $inc: { quantity: -quantity } }
                }
            }));

            await Product.bulkWrite(bulkOps, { session });

        } else if (orderStatus === "cancel") {
            order.status = "cancel";

            // Recover product quantities
            const bulkOps = order.products.map(({ productId, quantity }) => ({
                updateOne: {
                    filter: { _id: productId },
                    update: { $inc: { quantity: quantity } }
                }
            }));

            await Product.bulkWrite(bulkOps, { session });

            // Sending email
            const mailSubject = `Your Order Cancellation Notice`;
            const mailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Order Cancellation</title>
                <style>
                    body {
                        font-size: 20px;
                        font-family: Arial, sans-serif;
                    }
                    strong {
                        font-size: 22px; 
                    }
                    .email-container {
                        margin: 20px;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        background-color: #f9f9f9;
                    }
                    .email-footer {
                        margin-top: 20px;
                        font-size: 18px;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <p>Dear User,</p>
                    <p>We regret to inform you that your order with order ID: <strong>${orderId}</strong> has been cancelled by our administration team.</p>
                    <p>If you have any questions or need further assistance regarding this cancellation, please do not hesitate to reach out to us.</p>
                    <p>We apologize for any inconvenience this may cause and appreciate your understanding.</p>
                    <div class="email-footer">
                        <p>Thank you,</p>
                        <p><em><a href="#" target="_blank" style="text-decoration: none; color: #000;">ecommerce-store.com Support Team</a></em></p>
                    </div>
                </div>
            </body>
            </html>
            `;
            await sendMail(req.user.email, mailSubject, "", mailHtml);

        } else if (orderStatus === "delivered") {
            order.status = "delivered";
        } else {
            throw new apiError(400, "Invalid order status");
        }

        await order.save();
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(new apiResponse(200, `Order ${order.status}`, order));

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new apiError(500, "Error updating order status and product quantities");
    }
});

export {
    placeOrder,
    changeOrderStatus,
    getOrder,
}
