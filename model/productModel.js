import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: [
        'clothes',
        'shoes',
        'bags',
        'electronics',
        'gadgets',
        'cookwares',
        'accessories',
        'Books',
        'beauty',
      ],
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

const productModel = mongoose.model('product', productSchema)

export default productModel
