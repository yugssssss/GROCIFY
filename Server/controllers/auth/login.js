import jwt from "jsonwebtoken";
import { DeliveryPartner } from "../../models/index.js";
import { Customer } from "../../models/index.js";
import { GenerateTokens } from "./auth.js";


export const loginCustomer = async (req, reply) => {
    try {

        const { phone } = req.body;
        console.log(phone);

        let customer = await Customer.findOne({ phone })

        if (!customer) {
            customer = new Customer({
                phone,
                role: "Customer",
            })
            await customer.save();
        }
        const  accesstoken = await GenerateTokens(customer)

        return reply.status(201).send({
            message: "Customer created or Login successful",
            accesstoken,
            customer,
        })

    } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: "error in creating customer" })


    }
}


export const loginDeliveryPartner = async (req, reply) => {
    try {
        const { email, password } = req.body;

        const deliveryPartner = await DeliveryPartner.findOne({ email })

        if (!deliveryPartner) {
            console.log("deleivery partner not found");

            return reply.status(404).send({ message: "deleivery partner not found" })
        }

        if (password == deliveryPartner.password) {
            const accesstoken = await GenerateTokens(deliveryPartner)
            if (!accesstoken) {
                return reply.status(500).send({ message: "Failed to generate token" });
            }
            return reply.status(200).send({
                message: "Delivery partner login successful",
                accesstoken,
                deliveryPartner,
            })
        } else {
            return reply.status(501).send({ message: "Invalid Password" })
        }
    } catch (error) {
        console.log(error);
        return reply.status(501).send({ message: "error in creating DeliveryPartner" })
    }
}

export const fetchUser = async (req, reply) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.decode(token)
        const user = await Customer.findById(decodedData.userId) || await DeliveryPartner.findById(decodedData.userId)

        if (!user) {
            return reply.status(404).send({
                message: "Invalid token"
            })
        }

        return reply.status(200).send({
            message: "user fetched succesfully",
            user,
        })
    } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: "error in Fetching user" })
    }
}