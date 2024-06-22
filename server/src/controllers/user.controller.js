import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js"
import { sendMail } from "../utils/sendMail.js"

let randomNumber = 0

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new apiError(500, "Something went wrong while generating tokens");
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, address, phnumber, isAdmin } = req.body;

    // Validation
    if (!name || !email || !password || !address || !phnumber) {
        throw new apiError(400, "All fields are required");
    }

    // check if user already exist
    const existedUser = await User.findOne({
        $or: [{ phnumber }, { email }]
    })
    if (existedUser) {
        throw new apiError(409, "User with PH-number or email is already exist")
    }

    // create user object - create entery in DB
    const user = await User.create({
        name,
        email,
        password,
        address,
        phnumber,
        isAdmin,
    })

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new apiError("Something went wrong while registering the user");
    }

    return res.status(201).json(
        new apiResponse(200, "User registered successfully", createdUser)
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, phnumber, password } = req.body;

    // validation
    if ((!email && !phnumber)) {
        throw new apiError(400, "Either email or phone number is required");
    }
    if (!password) {
        throw new apiError(400, "password is required");
    }

    // finding from database 
    const user = await User.findOne({
        $or: [{ email }, { phnumber }]
    })
    if (!user) {
        throw new apiError(403, "user does not exist")
    }

    // password match
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new apiError(403, "Invalid Password")
    }

    // access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    // sending mail
    let str = ""
    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * 9) + 1;
        str = str + randomNumber
    }
    randomNumber = Number(str)

    const mailSubject = "Your Verification Code From The Ecommerce-store"
    const mailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Your Verification Code</title>
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
            <p>Your verification code is: <strong>${randomNumber}</strong></p>
            <p>Please use this code to complete your verification process. If you did not request this code, please disregard this email.</p>
            <p>Thank you,</p>
            <p><em><a href="https://ecommerce-store.com" target="_blank" style="text-decoration: none; color: #000;">Ecommerce-store.com Support Team</a></em></p>
        </body>
        </html>
        `;
    await sendMail(email, mailSubject, "", mailHtml)

    // send cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User Loggined Successfully"
            )
        )
})

const sendEmail = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new apiError(403, "Email is require")
    }

    // sending mail
    let str = ""
    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * 9) + 1;
        str = str + randomNumber
    }
    randomNumber = Number(str)

    const mailSubject = "Your Verification Code From The Ecommerce-store"
    const mailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Your Verification Code</title>
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
            <p>Your verification code is: <strong>${randomNumber}</strong></p>
            <p>Please use this code to complete your verification process. If you did not request this code, please disregard this email.</p>
            <p>Thank you,</p>
            <p><em><a href="https://ecommerce-store.com" target="_blank" style="text-decoration: none; color: #000;">Ecommerce-store.com Support Team</a></em></p>
        </body>
        </html>
        `;
    await sendMail(email, mailSubject, "", mailHtml)
    console.log("randomNumber = ", randomNumber, "Six = ", Number(sixDigits));

    return res.status(200).json(new apiResponse(200, {}, "Email sent to your Mailbox"))
})

const emailVerification = asyncHandler(async (req, res) => {
    const { sixDigits } = req.body
    if (!sixDigits) {
        throw new apiError(403, "Please enter 6-digits we sent you through email")
    }
    console.log("randomNumber = ", randomNumber, "Six = ", Number(sixDigits));

    if ((Number(sixDigits)) === randomNumber) {
        return res.status(200).json(new apiResponse(200, {}, "Email is verified"))
    }
    else {
        return res.status(200).json(new apiResponse(200, {}, "Incorrect Digits"))
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body
    if (!email || !newPassword) {
        throw new apiError(403, "Please enter Email and new Password")
    }
    const user = await User.findById(req.user?._id)
    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200).json(new ApiResponse(200, {}, 'Password Changed Succssfully'))
})


export {
    registerUser,
    loginUser,
    emailVerification,
    sendEmail,
    changePassword,
}