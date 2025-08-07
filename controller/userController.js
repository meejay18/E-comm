import userModel from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, ...others } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'credentials required',
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = userModel({ name, email, password: hash, ...others })
    const savedUser = await newUser.save()

    return res.status(201).json({
      message: 'User created successfully',
      data: savedUser,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find()

    return res.status(200).json({
      message: 'Users retrived  successfully',
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Credentials needed',
    })
  }
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(200).json({
        message: 'User not found. Create a new account',
      })
    }
    const check = bcrypt.compare(password, user.password)
    if (!check) {
      return res.status(200).json({
        message: 'Password incorrect ',
      })
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' })
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: true,
    })

    return res.status(200).json({
      message: 'Login successful',
    })
  } catch (error) {
    next(error)
  }
}
