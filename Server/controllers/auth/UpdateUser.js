import { Customer, DeliveryPartner } from "../../models/index.js"



export const updateUser = async (req, reply) => {
    try {
        const { userId, updatedData } = req.body;
        let user;
        let UserModel
         user =
        (await Customer.findById(userId)) ||
        (await DeliveryPartner.findById(userId));
  
         UserModel = user.role === "Customer" ? Customer : DeliveryPartner;


        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set:  updatedData ,
 
            },
            {
                new: true, runValidators: true
            }
        )

        if(!updatedUser){
            return reply.status(401).send({ message: "Please provide valid Userid for user updation" })

        }

      
        console.log("updatedUser sent to frontend:", updatedUser)

        return reply.status(200).send(updatedUser)




    } catch (error) {
        console.error("Update user error:", error);
        return reply.status(500).send({ message: "Internal server error" });
    }
}