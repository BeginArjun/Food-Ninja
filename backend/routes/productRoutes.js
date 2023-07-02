import express from "express"
import { getProducts, getTopProducts,
     getProductById, deleteProduct,
     createProduct, updateProduct, 
     reviewProduct } from "../controllers/productController.js"

import {auth,adminAuth} from "../middleware/auth.js"

const router=express.Router()

router.route('/').get(getProducts).post([auth,adminAuth],createProduct)
router.route('/top-products').get(getTopProducts)
router.route('/:id').get(getProductById).delete([auth,adminAuth],deleteProduct).patch([auth,adminAuth],updateProduct)
router.route('/:id/reviews').post(auth,reviewProduct)

export default router