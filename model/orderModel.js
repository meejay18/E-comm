import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
    },
    totalamount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

const orderModel = mongoose.model('order', orderSchema)
export default orderModel
