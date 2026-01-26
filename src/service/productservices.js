
import axios from "axios"
import { BASE_URL } from "./config"


export const getAllCategories = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/getCatagory`)
        return response.data
        console.log(response.data);
        
    } catch (error) {
        console.log("hello");
        
    }
}

export const getProductsBycategoryId = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/getProductsById/${id}`)
        return response.data
    } catch (error) {
        console.log("getProductsBycategoryId" , error);
        
    }
}