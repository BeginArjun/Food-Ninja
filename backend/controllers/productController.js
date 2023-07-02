import Products from "../models/productModel.js"

const getProducts=async(req,res)=>{
    const pageSize=5
    const page=Number(req.query.pageNumber) || 1
    // If req.query.keyword exist then return Object keyword else return empty object
    const keyword=req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    }:{}
    try{
        const count=await Products.count({...keyword})
        const product=await Products.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
        res.status(200).json({products:product,page,pages:Math.ceil(count/pageSize)})
    }
    catch(err){
        res.status(500).json({error:err.stack})
    }
}

// Products with most high-rated review
const getTopProducts=async(req,res)=>{
    try{
        const topProducts=await Products.find({}).sort({rating:-1}).limit(3)    // Get all Products and sort in descending by their rating and get 3 products at a time
        res.status(200).json(topProducts)
    }
    catch(err){
            res.status(500).json({error:err.stack})
    }
}

const getProductById=async(req,res)=>{
    try{
        const product=await Products.findById(req.params.id)
        if(!product){
            // If no product with _id===req.params.id
            res.status(404)
            throw new Error(`No Product with id : ${req.params.id} found!`)
        }
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:err.stack})
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const product=await Products.findByIdAndDelete(req.params.id)
        if(!product){
            res.status(404)
            throw new Error(`No Product with id : ${req.params.id} found!`)
        }
        res.status(200).json({status:'success',product})
    }
    catch(err){
        res.status(500).json({error:err.stack})
    }
}

const createProduct=async(req,res)=>{
    const {
        name,
        price,
        image,
        category,
        description,
        qty,
        totalReviews
      }=req.body
    try{
        const product = new Products({
            name,
            price,
            image,
            category,
            description,
            qty,
            totalReviews
          })
        const createProduct=await Products.create(product)
        res.status(200).json({success:true,createProduct})
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

const updateProduct=async(req,res)=>{
    const {
        id,
        name,
        price,
        image,
        category,
        description,
        qty
    }=req.body
    try{
        const product=await Products.findById(id)
        if(!product){
            // If no product with _id===req.params.id
            res.status(404)
            throw new Error(`No Product with id : ${req.params.id} found!`)
        }
        product.name = name || product.name
        product.price = price || product.price
        product.image = image || product.image
        product.category = category || product.category
        product.description = description || product.description
        product.qty=qty || product.qty
        product.totalReviews=product.totalReviews || 0
        product.rating=product.rating || 0

        const updatedProduct=await Products.findByIdAndUpdate(id,product,{returnDocument:'after'})
        res.status(200).json({success:true,updatedProduct})
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

const reviewProduct=async(req,res)=>{
    const {rating,comment}=req.body
    try{
        const product=await Products.findById(req.params.id)
        if(!product){
            // If no product with _id===req.params.id
            res.status(404)
            throw new Error(`No Product with id : ${req.params.id} found!`)
        }
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product Already Reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.unshift(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((a, c) => a + c.rating, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ success: true })
    }
    catch(err){
        res.status(500).json({success:false,error:err.stack})
    }
}

export { getProducts, getTopProducts, getProductById, deleteProduct, createProduct, updateProduct, reviewProduct }