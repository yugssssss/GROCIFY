import { fetchUser, loginCustomer, loginDeliveryPartner } from "../controllers/auth/login.js"
import { updateUser } from "../controllers/auth/UpdateUser.js"
import { getAllCategories } from "../controllers/Category.js"
import { ConfirmOrder, CreateOrder, getOrderById, getorders, updateOrderStatus } from "../controllers/order/order.js"
import { getProductByCategoryId } from "../controllers/product.js"



export const authRoutes = async(fastify , options)=>{
    fastify.post('/customer/login',loginCustomer),
    fastify.post('/delivery/login',loginDeliveryPartner),
    fastify.post('/fetchUser',fetchUser),
    fastify.post('/updateUser',updateUser),
    fastify.get('/getCatagory',getAllCategories),
    fastify.get('/getProductsById/:categoryId',getProductByCategoryId) ,
    fastify.post('/createOrder',CreateOrder),
    fastify.post('/confirmOrder/:id',ConfirmOrder),
    fastify.post('/updateOrderStatus/:id',updateOrderStatus),
    fastify.post('/getOrders',getorders),
    fastify.get('/getOrderById/:orderId',getOrderById)

}