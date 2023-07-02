import User from "../models/userModel.js"
import generateToken from "../utils/generateTokens.js"
// Authorize Usen and get JWT
const authUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(user && (await user.matchPassword(password))){
            res.status(200).json({...user,token:generateToken(user._id),success:true})
        }
        else{
            return res.status(401).json({success:false,user:null})
        }
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

// Get User Profile
const getUserProfile=async(req,res)=>{
    try{
        const user=User.findById(req.user._id)
        if(!user){
            return res.status(404).json({success:false,user:null}) 
        }
        res.status(200).json({success:true,user})
    }
    catch(err){

    }
}

// Update User Profile
const updateUserProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id)
        if(!user){
            return res.status(401).json({success:false,user:null})
        }
        user.firstName=req.body.firstNameame || user.firstName
        user.lastName=req.body.lastName || user.lastName
        user.email=req.body.email || user.email
        if(req.body.password){
            user.password=req.body.password
        }

        const updatedUser=await User.findByIdAndUpdate(req.user._id,user)
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

// If !user then register and get JWT
const registerUser=async(req,res)=>{
    const {firstName,lastName,email,password}=req.body
    try{
        const isUser=await User.findOne({email})
        if(isUser){
            return res.status(400).json({success:false,error:'User Exists'})
        }
        const user=await User.create({firstName,lastName,email,password})
        res.status(201).json({success:true,user})
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

const getUsers=async(req,res)=>{
    try{
        const users=await User.find({})
        if(!users){
            return res.status(404).json({success:false,error:'No Users'})
        }
        res.status(200).json({success:true,users})
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

const deleteUser=async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).json({success:false,error:'User Does Not Exist'})
        }
        res.status(200).json({success:true,user})
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

const getUserById=async(req,res)=>{
   try{
    const user=await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({success:false,error:'User Does Not Exist'})
    }
    res.status(200).json({success:true,user})
   }
   catch(err){
    res.status(500).json({success:false,error:err.stack})
   }
}

const updateUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.isAdmin = req.body.isAdmin || user.isAdmin

            const updatedUser=await User.findByIdAndUpdate(req.params.id,user)
            res.status(200).json({success:true,updateUser})
        }
        else{
            return res.status(404).json({success:false,error:'User Does Not Exist'})
        }
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

export { authUser, getUserById, updateUser, getUserProfile, deleteUser, registerUser, updateUserProfile, getUsers }