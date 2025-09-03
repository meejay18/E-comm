import express from 'express'
const route = express.Router()
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  loginUser,
  updateUser,
} from '../controller/userController.js'
import { authentication } from '../middlewares/authmiddleware.js'
import { isAdmin } from '../middlewares/adminmiddleware.js'

route.post('/createUser', createUser)
route.get('/getAllUsers', authentication, isAdmin, getAllUsers)
route.get('/getOneUser/:userId', authentication, isAdmin, getOneUser)
route.post('/loginuser', loginUser)
route.put('/user/:userId', authentication, updateUser)
route.delete('/user/:userId', authentication, deleteUser)

export default route
