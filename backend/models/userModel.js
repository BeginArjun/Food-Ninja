import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        max:[25,'Max Length Exceeded']
    },
    lastName:{
        type:String,
        required:true,
        max:[40, 'Max Length Exceeded']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
},{timestamps:true})

// Adds a method to check if the inputted password is equal to the hash one
userSchema.methods.matchPassword=async function(promptPassword){
    return await bcrypt.compare(promptPassword,this.password)
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }

    const salt=await bcrypt.genSalt() // Asynchronously generate salt with 10 rounds
    this.password=await bcrypt.hash(this.password,salt) // Async update password to it's hash one
})

export default mongoose.model('User',userSchema)