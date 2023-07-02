import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[
        {
            name: {type:String, required:true},
            qty:{type:Number, required:true, default:1},
            img:{type:String,required:true},
            price:{type:Number,required:true},
            product:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Product'}
        }
    ],
    shippingAddress:{
        address1:{type:String,required:true},
        address2:{type:String,required:false},
        zipCode:{type:Number,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true}
    },
    payment:{
        id:{type:String},
        method:{type:String,required:true},
        status:{type:String,required:true},
        update_time: { type: String },
        email_address: { type: String }
    },
    taxPrice:{type:Number,required:true,default:0.0},
    itemsPrice:{type:Number,required:true,default:0.0},
    shippingPrice:{type:Number,required:true,default:0.0},
    totalPrice:{type:Number,required:true,default:0.0},
    isPaid:{type:Boolean,required:true,default:false},
    paidAt:{type:Date},
    isDelivered:{type:Boolean,required:true,default:false},
    deliveredAt:{type:Date}
},{timestamps:true})

export default mongoose.model('Order',orderSchema)