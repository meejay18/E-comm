import express from 'express'
import { createOrderFromCart, viewAllOrders } from '../controller/orderController.js'
import { authentication } from '../middlewares/authmiddleware.js'
import { isAdmin } from '../middlewares/adminmiddleware.js'

const route = express.Router()

route.post('/create-order', authentication, createOrderFromCart)
route.get('/view-orders', authentication, isAdmin, viewAllOrders)

export default route
