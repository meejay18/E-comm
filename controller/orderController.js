import orderModel from '../model/orderModel.js'
import userModel from '../model/userModel.js'
import cartModel from '../model/cartModel.js'

export const createOrderFromCart = async (req, res, next) => {
  const { id } = req.user

  try {
    const cart = await cartModel.findOne({ userId: id }).populate('items.productId')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty',
      })
    }

    let totalamount = 0

    const order = cart.items.map((item) => {
      const price = item.productId.price
      totalamount += price * item.quantity

      return {
        productId: item.productId._id,
        quantity: item.quantity,
      }
    })

    const newOrder = new orderModel({
      id,
      items: order,
      totalamount,
      status: 'pending',
      paymentMethod: req.body.paymentMethod || 'unpaid',
    })
    cart.items = []
    // console.log(cart.items)

    await newOrder.save()

    return res.status(201).json({
      message: 'Order created successfully',
      data: newOrder,
    })
  } catch (error) {
    next(error)
  }
}

export const viewAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find()

    return res.status(200).json({
      message: 'Orders retrieved successfully',
      data: orders,
    })
  } catch (error) {
    next(error)
  }
}
