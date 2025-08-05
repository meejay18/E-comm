import express from 'express'
const route = express.Router()
import { createUser, getAllUsers } from '../controller/userController.js'

route.post('/createUser', createUser)
route.get('/getAllUsers', getAllUsers)

export default route
