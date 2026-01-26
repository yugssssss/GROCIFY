import { Category } from "../models/index.js";



export const getAllCategories = async(req,reply)=>{
    try {
        const categories = await Category.find()

        if(!categories){
            return reply.status(404).send({message:"error in getting categories"})

        }

        return reply.status(200).send({categories})
    } catch (error) {
        console.log(error);
        
        return reply.status(404).send({ message: "error in getting category list" })

    }
}
