import express from 'express'
const route = express.Router()
import { adminUser, createUser, getAllUsers, loginUser } from '../controller/userController.js'

route.post('/createUser', createUser)
route.post('/createAdmin', adminUser)
route.get('/getAllUsers', getAllUsers)
route.post('/loginuser', loginUser)

export default route
