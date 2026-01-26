

import axios from "axios";
import { BASE_URL, BRANCH_ID } from "./config";

export const CreateOrderFunction = async (items, totalPrice, user) => {
    console.log("Calling CreateOrderFunction with:", totalPrice);
    console.log("hello yug");


    try {
        console.log('tryy');

        const response = await axios.post(`${BASE_URL}/createOrder`, {
            items: items,
            branch: BRANCH_ID,
            totalPrice: totalPrice,
            userId: user._id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("response_data  ", response.data);

        return response.data;

    } catch (error) {
        console.log(error);

        console.log("create order error", error);
        return null

    }
}

export const getOrderById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getOrderById/${id}`)
        return response.data;
    } catch (error) {
        console.log("fetch order error", error);
        return null

    }
}

export const fetchCustomerOrders = async (userId) => {
    try {
        const response = await axios.post(`${BASE_URL}/getOrders`, {
            customerId: userId
        })

        return response.data
    } catch (error) {
        console.log('Fetch Customer order Error', error);

    }
}


export const fetchOrders = async (
    status,
    userId,
    branchId,
    
) => {
    let body =
        status == 'available'
            ? {
                status,
                branchId
            }
            : {
                branchId,
                deliveryPartnerId: userId
            };

    try {
        const response = await axios.post(`${BASE_URL}/getOrders`, body
             // <- hook up the signal here
          );
        console.log("response data of getorders :", response.data);
         
        return response.data;
    } catch (error) {
        console.log('Fetch Delivery Order Error', error);
        return null;
    }
};

export const confirmOrder = async (
    id,
    location,
    userId
) => {
    try {
        const response = await axios.post(`${BASE_URL}/confirmOrder/${id}`, {
            userId:userId,
            deliveryPersonLocation: location,
        });
        return response.data;
    } catch (error) {
        console.log("confirmOrder Error", error);
        return null;
    }
};

export const sendLiveOrderUpdates = async (
    id,
    location,
    status
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/updateOrderStatus/${id}`, {
        deliveryPartnerLocation: location,
        status,
      });
      return response.data;
    } catch (error) {
      console.log("sendLiveOrderUpdates Error", error);
      return null;
    }
  };
  
