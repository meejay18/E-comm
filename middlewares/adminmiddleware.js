export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'forbidden, Only admins are allowed to carry out this operation',
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}
