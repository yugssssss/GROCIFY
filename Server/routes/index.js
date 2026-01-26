import fastify from "fastify"
import { authRoutes } from "./auth.js"



const prefix = '/api'

export const registerRouter =async(fastify)=>{
    fastify.register(authRoutes,{prefix:prefix});
}