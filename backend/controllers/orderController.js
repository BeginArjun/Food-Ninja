
const addOrderItem=async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body

    res.status(200).send('Add Order Items')
}

const getOrderById=async(req,res)=>{
    res.status(200).json({id:req.params.id,order:'Get Success'})
}

const updateOrderToPaid=async(req,res)=>{
    res.status(200).json({id:req.params.id,paid:true})
}

const getMyOrders=async(req,res)=>{
    res.status(200).send('My Orders')
}

const getAllOrders=async(req,res)=>{
    res.status(200).send('All Orders')
}

const updateOrderToDelivered=async(req,res)=>{
    res.status(200).json({id:req.params.id,delivered:true})
}

export { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered }