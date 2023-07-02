
const getProducts=async(req,res)=>{
    res.status(200).send('Get Products')
}

const getTopProducts=async(req,res)=>{
    res.status(200).send('Top Products')
}

const getProductById=async(req,res)=>{
    res.status(200).json({id:req.params.id,status:'success'})
}

const deleteProduct=async(req,res)=>{
    res.status(200).json({id:req.params.id,deleteStatus:'success'})
}

const createProduct=async(req,res)=>{
    res.status(200).send('Create Product')
}

const updateProduct=async(req,res)=>{
    res.status(200).json({id:req.params.id,updateStatus:true})
}

const reviewProduct=async(req,res)=>{
    res.status(200).json({id:req.params.id,review:true})
}

export { getProducts, getTopProducts, getProductById, deleteProduct, createProduct, updateProduct, reviewProduct }