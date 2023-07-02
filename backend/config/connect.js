import mongoose from "mongoose";

const connectDB=async(url)=>{
    try{
        const conn=await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    }
    catch(err){
        console.error(err.stack);
        process.exit(1)
    }
}

export default connectDB