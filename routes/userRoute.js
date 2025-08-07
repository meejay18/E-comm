import express from 'express'
const route = express.Router()
import { createUser, getAllUsers, loginUser } from '../controller/userController.js'

route.post('/createUser', createUser)
route.get('/getAllUsers', getAllUsers)
route.post('/loginuser', loginUser)

export default route
