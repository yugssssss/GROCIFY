import { Product } from "../models/index.js";



export const getProductByCategoryId = async(req,reply)=>{
    try {
        
        const {categoryId}= req.params;
    
        const Products = await Product.find({category:categoryId})
    
        if(!Products){
            return reply.status(404).send({message:"error in getting products"})
    
        }
    
        return reply.status(200).send({Products})
    } catch (error) {
        console.log(error);
        
        return reply.status(404).send({ message: "error in getting product list" })
    }
}