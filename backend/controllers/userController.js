
// Authorize Usen and get JWT
const authUser=async(req,res)=>{
    const {email,password}=req.body
    res.status(200).json({email:email})
}

// Get User Profile
const getUserProfile=async(req,res)=>{
    res.status(200).json({userProfile:true})
}

// Update User Profile
const updateUserProfile=async(req,res)=>{
    res.status(200).json({update:true})
}

// If !user then register and get JWT
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body
    res.status(200).json({username:name,useremail:email,userpassword:password})
}

const getUsers=async(req,res)=>{
    res.status(200).send('All Users')
}

const deleteUser=async(req,res)=>{
    res.status(200).json({deleteUserSuccess:true})
}

const getUserById=async(req,res)=>{
    res.status(200).json({id:req.params.id,status:'Get User Success'})
}

const updateUser=async(req,res)=>{
    res.status(200).json({update:'success'})
}

export { authUser, getUserById, updateUser, getUserProfile, deleteUser, registerUser, updateUserProfile, getUsers }