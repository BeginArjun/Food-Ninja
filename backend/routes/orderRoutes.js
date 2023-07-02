import express from "express"
import { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered } from '../controllers/orderController.js'

const router=express.Router()

router.route('/').post(addOrderItem).get(getAllOrders)
router.route('/myorders').get(getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/payment').patch(updateOrderToPaid)
router.route('/:id/deliver').patch(updateOrderToDelivered)

export default router