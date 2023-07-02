import express from "express"
import { getProducts, getTopProducts,
     getProductById, deleteProduct,
     createProduct, updateProduct, 
     reviewProduct } from "../controllers/productController.js"


const router=express.Router()

router.route('/').get(getProducts).post(createProduct)
router.route('/top-products').get(getTopProducts)
router.route('/:id').get(getProductById).delete(deleteProduct).patch(updateProduct)
router.route('/:id/reviews').post(reviewProduct)

export default router