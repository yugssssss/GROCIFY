


import 'dotenv/config'
import fastifySession from '@fastify/session'

import ConnectMongoDBSession from 'connect-mongodb-session'
import {Admin} from "../models/user.js"

const MongoDBStore = ConnectMongoDBSession(fastifySession)

export const session = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection:"sessions",
})

session.on("error",(error)=>{
    console.log("session store error",error);
    
})

export const authenticate = async(email,password)=>{
    if(email && password){
        const user = await Admin.findOne({email})
        if(!user){
            return null
        }
       if(user.password == password) {
        
            return Promise.resolve({email,password});
        }
        else{
            return null;
        }
       }
       return null
    }


export const PORT =process.env.PORT || 7000;
export const COOKIE_PASSWORD= process.env.COOKIE_PASSWORD;