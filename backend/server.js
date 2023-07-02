import express from "express"
import dotenv from "dotenv"
import orderRoutes from "./routes/orderRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import connectDB from "./config/connect.js"
import path from "path"

// dotenv config
dotenv.config()

// app setup
const app=express()
const PORT=process.env.PORT || 8000

// Middleware
app.use(express.json())

//ROUTES

// ORDER ROUTE
app.use('/api/v1/orders',orderRoutes)
// PRODUCT ROUTE
app.use('/api/v1/products',productRoutes)
// USER ROUTE
app.use('/api/v1/users',userRoutes)
// UPLOAD ROUTE
app.use('/api/v1/upload',uploadRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const start=async()=>{
    await connectDB(process.env.MONGO_DB_URI)
    app.listen(PORT,()=>{
        console.log(`Listening on ${PORT}`);
    })
}

start()