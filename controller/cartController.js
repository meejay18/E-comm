import cartModel from '../model/cartModel.js'
import userModel from '../model/userModel.js'

export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body
  const { id } = req.user

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      message: 'Quantity must be at least one',
      data: savedCart,
    })
  }
  try {
    let userCart = await cartModel.findOne({ userId: id }).populate('items.productId')
    console.log(userCart)

    if (!userCart) {
      userCart = new cartModel({ userId: id, items: [] })
    }

    const checkAlreadyExistingItemIndex = userCart.items.findIndex(
      (el) => el.productId.toString() === productId
    )
    if (checkAlreadyExistingItemIndex > -1) {
      userCart[checkAlreadyExistingItemIndex].quantity += quantity
    } else {
      userCart.items.push({ productId, quantity })
    }

    const savedCart = await userCart.save()

    await userModel.findByIdAndUpdate(id, { $push: { cart: savedCart.id } }, { new: true })

    return res.status(200).json({
      message: 'Product succesfully added to cart',
      data: savedCart,
    })
  } catch (error) {
    next(error)
  }
}
