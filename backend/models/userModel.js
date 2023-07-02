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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value) {
            if( value.toLowerCase().includes('password')) {
            throw new Error('password musn\'t contain password')
           }
        }
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    tokens:[
        {
            token:{type:String,required:true}
        }
    ]
},{timestamps:true})

// Adds a method to check if the inputted password is equal to the hash one
userSchema.methods.matchPassword=async(promptPassword)=>{
    return await bcrypt.compare(promptPassword,this.password)
}

userSchema.pre('save',async(next)=>{
    if(!this.isModified('password')){
        next()
    }

    const salt=await bcrypt.genSalt() // Asynchronously generate salt with 10 rounds
    this.password=await bcrypt.hash(this.password,salt) // Async update password to it's hash one
})

export default mongoose.model('User',userSchema)