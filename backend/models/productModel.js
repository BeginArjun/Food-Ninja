import mongoose from "mongoose";

// Review Schema
const reviewSchema=mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps})

// Product Schema
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    image:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    reviews:[reviewSchema],
    rating:{type:Number,required:true,default:0.0},
    totalReviews:{type:Number,required:true,default:0},
    price:{type:Number,required:true,default:0.0},
    qty:{type:Number,required:true,default:0}

})

export default mongoose.model('Product',productSchema)