export const initializePayment = async (req, res, next) => {
  const { email, amount } = req.body
  try {
  } catch (error) {
    next(error)
  }
}
