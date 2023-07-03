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
        return res.status(400).json({succes:false,error:'No Orders Found'})
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

        res.status(201).json({success:true,createOrder})
    }
    catch(err){
        res.status(500).json({succes:false,error:err.stack})
    }
}

const getOrderById=async(req,res)=>{
   try{
        const order=await Order.findById(req.params.id)
        if(!order){
            return res.status(404).json({success:false,error:`Order with id : ${req.params.id} not found!`})
        }
        res.status(200).json({success:true,order})
   }
   catch(err){
    res.status(500).json({success:false,error:err.stack})
   }
}

const updateOrderToPaid=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(!order){
            return res.status(404).json({success:false,error:'Order Not Found'})
        }
        order.isPaid=true
        order.paidAt=Date.now()
        order.payment={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
        }

        const updatedOrder=await Order.findByIdAndUpdate(req.params.id,order)
        res.status(200).json({succes:true,updatedOrder})
    }
    catch(err){
        res.status(500).json({succes:false,error:err.stack})
    }
}

const getMyOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user._id})
        if(!orders){
            return res.status(404).json({success:false,error:'No Orders'})
        }
        res.status(200).json({succes:true,orders})
    }
    catch(err){
        res.status(500).json({succes:false,error:err.stack})
    }
}

const getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find({})
        if(!orders){
            return res.status(404).json({succes:false,error:'No Orders'})
        }
        res.status(200).json({succes:true,orders})
    }
    catch(err){
        res.status(500).json({succes:false,error:err.stack})
    }
}

const updateOrderToDelivered=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(!order){
            return res.status(404).json({succes:false,error:'Order Not Found'})
        }
        if(order.isDelivered){
            return res.status(400).json({succes:false,error:'Already Delivered'})
        }
        order.isDelivered=true
        order.deliveredAt=Date.now()
        const updatedOrder=await order.save()
        res.status(200).json({succes:true,updatedOrder})
    }
    catch(err){
        res.status(500).json({succes:false,error:err.stack})
    }
}

export { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered }