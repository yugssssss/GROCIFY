
import axios from 'axios'
import { BASE_URL } from './config'
import { tokenStorage } from '@state/Storage'
import { useAuthStore } from '@state/authStore'

export const customerLogin = async(phone)=>{
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`,{phone})
        console.log(response.data);
        
        const {accesstoken,customer} = response.data
        tokenStorage.set("accesstoken", accesstoken)

        const {setUser}=useAuthStore.getState()
        console.log("this is user  ",customer);
        
        setUser(customer)
    } catch (error) {
        console.log(error)
    }
}


export const deleveryLogin = async(email,password)=>{
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`,{email,password})
        console.log("delivery login user",response.data);
        
        const {accesstoken,deliveryPartner} = response.data
        tokenStorage.set("accesstoken", accesstoken)

        const {setUser}=useAuthStore.getState()
        setUser(deliveryPartner)
    } catch (error) {
        console.log(error)
        console.log("errorr");
        
    }
}

export const Updateduserlocation = async(userId, updatedData)=>{
    try {
        console.log(updatedData);
        
        const response = await axios.post(`${BASE_URL}/updateUser`,{userId, updatedData})
        console.log("fetched data of updateuserlocation ::",response.data);
        return response.data;
        
        
    } catch (error) {
        console.log(error)
        console.log("errorr in Updateduserlocation function");
    }
}


