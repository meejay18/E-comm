import orderModel from '../model/orderModel.js'
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
    const orders = await orderModel
      .find()
      .populate('user_id', 'name email')
      .populate('items.productId', 'name, price')

    return res.status(200).json({
      message: 'Orders retrieved successfully',
      data: orders,
    })
  } catch (error) {
    next(error)
  }
}

export const updateOrderstatus = async (req, res, next) => {
  const { orderId } = req.params
  const { status } = req.body
  try {
    const validateStatus = ['pending', 'paid', 'shipped', 'deleivered', 'cancelled']
    if (!validateStatus.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status',
      })
    }

    const order = await orderModel.findById(orderId)
    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      })
    }

    order.status = status
    await order.save()

    return res.status(200).json({
      message: 'Order updated successfully',
      data: order,
    })
  } catch (error) {
    next(error)
  }
}
