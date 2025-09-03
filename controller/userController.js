import userModel from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, ...others } = req.body

    if (!name) {
      return res.status(400).json({
        message: 'name required',
      })
    }
    if (!email) {
      return res.status(400).json({
        message: 'email required',
      })
    }
    if (!password) {
      return res.status(400).json({
        message: 'Input password',
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
export const getOneUser = async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await userModel.findById(userId)

    return res.status(200).json({
      message: 'User retrived  successfully',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  const { id, role } = req.user
  const { userId } = req.params
  const data = req.body
  try {
    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        data: updateUser,
      })
    }

    const isOwner = user.id === id
    const isAdmin = role === 'admin'

    if (!isOwner || !isAdmin) {
      return res.status(400).json({
        message: 'You cannot carry out this operation',
      })
    }
    const updateUser = await userModel.findByIdAndUpdate(userId, { ...data }, { new: true })

    return res.status(200).json({
      message: 'User retrived  successfully',
      data: updateUser,
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  if (!email) {
    return res.status(400).json({
      message: 'Email required',
    })
  }
  if (!password) {
    return res.status(400).json({
      message: 'Password required',
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
