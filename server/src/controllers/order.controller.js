import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const placeOrder = asyncHandler(async (req, res) => {
    const { products, totalprice, status } = req.body
    if (!products || !totalprice || !status) {
        throw new apiError(403, "All Fields are require");
    }

    const order = await Order.create({
        buyer: req.user._id,
        products,
        totalprice,
        status: "pending"
    })

    return res.status(201).json(
        new apiResponse(200, "Order plaed successfully", order)
    );
})

const changeOrderStatus = asyncHandler(async (req, res) => {
    const { orderStatus, orderId, productId, quantityToDecrease } = req.body // "cancel" or "approved"

    if (!quantityToDecrease || isNaN(quantityToDecrease) || quantityToDecrease <= 0) {
        throw new apiError(400, "Invalid quantity to decrease");
    }

    if (orderStatus == "approved" || "approve") {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { $set: { status: "shipped" } },
            { new: true }
        ).select("")
        if (!order) {
            throw new apiError(404, "Order not found");
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new apiError(404, "Product not found");
        }
        if (product.quantity < quantityToDecrease) {
            throw new apiError(400, "Insufficient quantity");
        }
        // Update the product quantity
        product.quantity -= quantityToDecrease;
        await product.save();
        if (!orderStatus || !orderId) {
            throw new apiError(500, "Order status is require");
        }

        // sending mail
        const mailSubject = `Your Order Has Been Shipped`;
        const mailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Order Shipped</title>
            <style>
                body {
                    font-size: 20px;
                    font-family: Arial, sans-serif;
                }
                strong {
                    font-size: 22px; 
                }
            </style>
        </head>
        <body>
            <p>Dear User,</p>
            <p>We are pleased to inform you that your order with order ID: <strong>${orderId}</strong> has been shipped.</p>
            <p>You can expect to receive your order soon. We will provide you with tracking information as it becomes available.</p>
            <p>If you have any questions or need further assistance regarding your order, please do not hesitate to reach out to us.</p>
            <p>Thank you for shopping with us,</p>
            <p><em><a href="#" target="_blank" style="text-decoration: none; color: #000;">ecommerce-store.com Support Team</a></em></p>
        </body>
        </html>
        `;
        await sendMail(email, mailSubject, "", mailHtml);

        return res.status(200).json(new apiResponse(200, "Order Shipped", order));
    }
    else if (orderStatus == "cancel") {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { $set: { status: "cancel" } },
            { new: true }
        ).select("")
        // sending mail
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
            </style>
        </head>
        <body>
            <p>Dear User,</p>
            <p>We regret to inform you that your order with order ID: <strong>${orderId}</strong> has been cancelled by our administration team.</p>
            <p>If you have any questions or need further assistance regarding this cancellation, please do not hesitate to reach out to us.</p>
            <p>We apologize for any inconvenience this may cause and appreciate your understanding.</p>
            <p>Thank you,</p>
            <p><em><a href="#" target="_blank" style="text-decoration: none; color: #000;">ecommerce-store.com Support Team</a></em></p>
        </body>
        </html>
        `;
        await sendMail(email, mailSubject, "", mailHtml);

        return res.status(200).json(new apiResponse(200, "Order Canceled", order));
    }
    else if (orderStatus == "delivered") {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { $set: { status: "delivered" } },
            { new: true }
        ).select("")
        // sending mail
        const mailSubject = `Your Order Has Been Delivered!`;
        const mailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Order Delivered</title>
            <style>
                body {
                    font-size: 20px;
                    font-family: Arial, sans-serif;
                }
                strong {
                    font-size: 22px;
                }
            </style>
        </head>
        <body>
            <p>Dear Customer,</p>
            <p>We are pleased to inform you that your order <strong>#${orderId}</strong> has been successfully delivered.</p>
            <p>We hope you are satisfied with your purchase. If you have any questions or concerns, please do not hesitate to contact our support team.</p>
            <p>Thank you for shopping with us!</p>
            <p>Best regards,</p>
            <p><em><a href="#" target="_blank" style="text-decoration: none; color: #000;">ecommerce-store.com Support Team</a></em></p>
        </body>
        </html>
        `;
        await sendMail(email, mailSubject, "", mailHtml);


        return res.status(200).json(new apiResponse(200, "Order delivered", order));
    }
    else {
        return res.status(300).json(
            new apiResponse(300, "Order Status should be 'approved' or 'cancel'", {})
        );
    }
})


export {
    placeOrder,
    changeOrderStatus,
}