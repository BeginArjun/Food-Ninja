import express from "express"
import { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered } from '../controllers/orderController.js'
import {auth,adminAuth} from "../middleware/auth.js"
const router=express.Router()

router.route('/').post([auth,adminAuth],addOrderItem).get([auth,adminAuth],getAllOrders)
router.route('/myorders').get(auth,getMyOrders)
router.route('/:id').get(auth,getOrderById)
router.route('/:id/payment').patch(auth,updateOrderToPaid)
router.route('/:id/deliver').patch([auth,adminAuth],updateOrderToDelivered)

export default router