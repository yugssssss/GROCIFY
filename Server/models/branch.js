

import mongoose from 'mongoose'


const BranchSchema = new mongoose.Schema({
    name:{type:String, required:true},
    liveLocation:{
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        },
    },
    address :{type:String},
    deliveryPartners:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"DeliveryPartner"
        }
    ]
})

export const Branch = mongoose.model("Branch" , BranchSchema)