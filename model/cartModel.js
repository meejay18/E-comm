import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
})

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
)

const cartModel = mongoose.model('cart', cartSchema)
export default cartModel
