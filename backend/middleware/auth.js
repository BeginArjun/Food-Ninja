import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const auth=async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]
            const decodedToken=jwt.verify(token,process.env.JWT_KEY)
            req.user=await User.findById(decodedToken.id).select('-password')   // Select all field of this user except password
            next()
        }
        catch(err){
            res.status(401)
            throw new Error('Invalid Token')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Invalid Token')
    }
}

const adminAuth=async(req,res,next)=>{
    if(req.user.isAdmin){
        next()
    }
    else{
        res.status(401)
        throw new Error('Not Authorized')
    }
}

export {auth,adminAuth}