

import "dotenv/config";
import fastify from 'fastify'
import cors from '@fastify/cors';
import { connectDB } from './config/connect.js'
import { admin, buildAdminRouter } from "./config/setup.js";
import { registerRouter } from "./routes/index.js";
import fastifySocketIO from "fastify-socket.io"

const start = async () => {
  const PORT = 8000
  const app = fastify()

app.register(fastifySocketIO,{
  cors:{
    origin:"*"
  },
  pingInterval:10000,
  pingTimeout:5000,
  transports:['websocket']
})

  await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST']
  });
  await connectDB(process.env.MONGO_URI)
  await registerRouter(app)
  await buildAdminRouter(app)

  app.listen({ port: PORT, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      console.log(err)

    }
    console.log(`BLINKIT STARTED ON http://localhost:${PORT}${admin.options.rootPath}`)


  })

  app.ready().then(()=>{
    app.io.on('connection',(socket)=>{
      console.log("A user connected 💚💚");

      socket.on("joinRoom",(orderId)=>{
        socket.join(orderId)
        console.log(`🔴🔴 user joined room ${orderId}`);
        
      })
      socket.on('disconnect',()=>{
        console.log("user Disconnected ❌❌");
        
      })
      
    })
  })

}

start();