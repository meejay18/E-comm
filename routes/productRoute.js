import express from 'express'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsById,
  updateProduct,
} from '../controller/productController.js'
const route = express.Router()
import upload from '../utils/multer.js'
import { authentication } from '../middlewares/authmiddleware.js'
import { isAdmin } from '../middlewares/adminmiddleware.js'

route.post('/createProduct', authentication, isAdmin, upload.single('image'), createProduct)
route.put('/updateProduct/:productId', authentication, isAdmin, upload.single('image', 2), updateProduct)
route.delete('/deleteProduct/:productId', authentication, isAdmin, deleteProduct)
route.get('/getAllProducts', getAllProducts)
route.get('/getProductsByCategory/:categoryname', getProductsByCategory)
route.get('/getProductsById/:productId', getProductsById)

export default route
