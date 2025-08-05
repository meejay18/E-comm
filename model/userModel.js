import mongoose, { Types } from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    cart: [
      {
        type: Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  { timestamps: true }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
