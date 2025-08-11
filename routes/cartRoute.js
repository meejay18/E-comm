import express from 'express'
import { addToCart } from '../controller/cartController.js'
import { authentication } from '../middlewares/authmiddleware.js'

const route = express()

route.post('/addToCart', authentication, addToCart)
export default route
