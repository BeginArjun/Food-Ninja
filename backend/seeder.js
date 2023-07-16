import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './Data/user.js'
import products from './Data/product.js';
import User from './models/userModel.js'
import Product from './models/productModel.js';
import Order from './models/orderModel.js'
import connectDB from './config/connect.js'

dotenv.config()

connectDB(process.env.MONGO_DB_URI)

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported')
    process.exit()
  }
  catch (error) {
    console.error(error)
    process.exit(1)
  }
}
const destoryProducts = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()


    console.log('Data Destroyed')
    process.exit()
  }
  catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destoryProducts()
}
else {
  importData()
}