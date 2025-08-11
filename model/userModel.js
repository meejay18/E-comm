import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
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
    address: {
      city: String,
      street: String,
      state: String,
      country: String,
      postalCode: String,
    },
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  { timestamps: true }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
