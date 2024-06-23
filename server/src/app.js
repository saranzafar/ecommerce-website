import cookieParser from "cookie-parser"
import express, { json, urlencoded } from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// injecting middlewares
app.use(json({ limit: "16kb" }))
app.use(urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// importing routes
import userRoutes from "./routes/user.routes.js"
import categoriesRoutes from "./routes/categorie.routes.js"
import productRoutes from "./routes/product.routes.js"


// routes declaration 
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/categories", categoriesRoutes)
app.use("/api/v1/products", productRoutes)

// http://localhost:8000/api/v1/users/register

export { app }