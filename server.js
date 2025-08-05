import express from 'express'
import mongoose from 'mongoose'
import cookieparser from 'cookie-parser'
const app = express()
const PORT = 7070
import dotenv from 'dotenv'
dotenv.config()
import userRoute from './routes/userRoute.js'

app.use(express.json())
app.use(cookieparser())

app.use(userRoute)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log(err.message)
  })

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Something went wrong')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
