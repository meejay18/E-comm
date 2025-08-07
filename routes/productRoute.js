import express from 'express'
import { createProduct, deleteProduct, updateProduct } from '../controller/productController.js'
const route = express.Router()
import upload from '../utils/multer.js'
import { authentication } from '../middlewares/authmiddleware.js'
import { isAdmin } from '../middlewares/adminmiddleware.js'

route.post('/createProduct', authentication, isAdmin, upload.single('image', 2), createProduct)
route.put('/updateProduct/:productId', authentication, isAdmin, upload.single('image', 2), updateProduct)
route.delete('/deleteProduct/:productId', authentication, isAdmin, deleteProduct)

export default route
