import { DeliveryPartner } from "../../models/index.js";
import { Order } from "../../models/index.js";
import { Branch } from "../../models/index.js";
import { Customer } from "../../models/index.js";



export const CreateOrder = async (req, reply) => {
    try {
        console.log("BODY RECEIVED: ", req.body);
        const { userId, totalPrice, items, branch } = req.body;
        const CustomerData = await Customer.findById(userId);
        const BranchData = await Branch.findById(branch);


        
        if (!CustomerData || !BranchData) {
            return reply.status(404).send({ message: "Customer or Branch not found" });
        }

        const newOrder = new Order({
            customer: userId,
            branch: branch,
            items: items.map((item) => ({
                id: item.id,
                item: item.item,
                count: item.count
            })),
            deliveryLocation: {
                latitude: CustomerData.liveLocation.latitude,
                longitude: CustomerData.liveLocation.longitude,
                address: CustomerData.address
            },
            totalPrice,
            pickupLocation: {
                latitude: BranchData.liveLocation.latitude,
                longitude: BranchData.liveLocation.longitude,
                address: BranchData.address
            }
        });

        
        let savedOrder = await newOrder.save();
        
        savedOrder = await savedOrder.populate("items.item")

        return reply.status(201).send(savedOrder);

    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Error in creating an order" });
    }
};


export const ConfirmOrder = async (req, reply) => {
    try {
        const { id } = req.params;
        const { userId, deliveryPersonLocation } = req.body;

        const order = await Order.findById(id)
        if (!order) {
            return reply.status(404).send({ message: "Order id is invalid" })

        }

        const user = await DeliveryPartner.findById(userId)
        if (!user) {
            return reply.status(404).send({ message: "user id is invalid" })

        }

        if (order.status !== 'available') {
            return reply.status(500).send({ message: "order is not available" })

        }

        order.status = 'confirmed';
        order.deliveryPartner = userId
        order.deliveryPersonLocation = {
            latitude:deliveryPersonLocation?.latitude,
            longitude:deliveryPersonLocation?.longitude
        }
        req.server.io.to(id).emit('orderConfirmed', order)
        await order.save()

        return reply.status(201).send(order)
    } catch (error) {
        console.log(error);

        return reply.status(404).send({ message: "error in confirming a order" })
    }
}


export const updateOrderStatus = async (req, reply) => {
    try {
        const {id } = req.params;
        const { status, deliveryPartnerLocation, userId } = req.body;

        const order = await Order.findById(id)
        if (!order) {
            return reply.status(404).send({ message: "orderId is invalid" })
        }

        if (order.status == "cancelled" || order.status == "delivered") {
            return reply.status(500).send({ message: "status is not supported" })

        }

        // if (order.deliveryPartner != userId) {
        //     return reply.status(500).send({ message: "userid is not supported" })

        // }

        order.status = status;
        order.deliveryPersonLocation = deliveryPartnerLocation
        await order.save();


        req.server.io.to(id).emit("liveTrackingUpdates", order)
        return reply.status(200).send(order)

    } catch (error) {
        console.log(error);

        return reply.status(404).send({ message: "error in updating a order" })
    }
}


export const getorders = async (req, reply) => {
    try {
        const { status, customerId, deliveryPartnerId, branchId } = req.body;
        let query={};
        if (status) {
            query.status = status;
        }
        if (customerId) {
            query.customer = customerId;
        }
        if (deliveryPartnerId) {
            query.deliveryPartner = deliveryPartnerId;
        }
        if (branchId) {
            query.branch = branchId;
        }

        console.log("orders wali query :::",query);
        
        const orders = await Order.find(query)
            .populate("customer deliveryPartner branch items.item");

        if (!orders) {
            return reply.status(404).send({ message: "error in fetching  orders" })

        }

        console.log(orders);
        
        return reply.status(200).send(orders);

    } catch (error) {
        console.log(error);

        return reply.status(404).send({ message: "error in gettings  orders" })
    }
}

export const getOrderById = async (req, reply) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate("customer deliveryPartner branch items.item")

        if (!order) {
            return reply.status(404).send({ message: "error in getting a  order" })

        }

        return reply.status(200).send(order)
    } catch (error) {
        return reply.status(500).send({ message: "error in getting a  order" })

    }
}



  