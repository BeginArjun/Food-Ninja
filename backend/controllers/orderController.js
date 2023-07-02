import Order from "../models/orderModel.js"
const addOrderItem=async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        payment,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body

    if(orderItems && orderItems.length==0){
        res.status(400)
        throw new Error('No Order Items')
        return
    }

    try{
        const order=new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            payment,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createOrder=await Order.create(order)

        res.status(201).json(createOrder)
    }
    catch(err){
        res.status(500).json({error:err.stack})
    }

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