import productModel from '../model/productModel.js'
import cloudinary from '../utils/cloudinary.js'
import fs from 'fs/promises'
export const createProduct = async (req, res, next) => {
  try {
    const file = req.file
    // console.log(file)

    const { image, ...others } = req.body
    // console.log(file)

    const resource = await cloudinary.uploader.upload(file.path)

    const newProduct = await productModel({ image: resource.secure_url, ...others })
    const savedProduct = await newProduct.save()
    await fs.unlink(file.path)

    return res.status(201).json({
      message: 'Product created succesfully',
      data: savedProduct,
    })
  } catch (error) {
    await fs.unlink(file.path)
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params
  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId)
    return res.status(200).json({
      message: 'Product deleted successfully',
      data: deletedProduct,
    })
  } catch (error) {
    next(error)
  }
}
export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params
    const { image, ...others } = req.body
    const localFIlePath = req.file.path

    const resource = await cloudinary.uploader.upload(localFIlePath)
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { image: resource.secure_url, ...others },
      { new: true }
    )

    await fs.unlink(localFIlePath)
    return res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct,
    })
  } catch (error) {
    await fs.unlink(localFIlePath)
    next(error)
  }
}

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find()

    return res.status(200).json({
      message: 'Products retrieved successfully',
      data: products,
    })
  } catch (error) {
    next(error)
  }
}
export const getProductsById = async (req, res, next) => {
  const { productId } = req.params
  try {
    const products = await productModel.findById(productId)

    return res.status(200).json({
      message: 'Product retrieved successfully',
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

export const getProductsByCategory = async (req, res, next) => {
  const { categoryname } = req.params

  try {
    const products = await productModel.find({ category: categoryname })

    if (products.length === 0) {
      return res.status(404).json({
        message: 'No products found in this category',
        data: null,
      })
    }
    return res.status(200).json({
      message: `Products by category ${categoryname}`,
      data: products,
    })
  } catch (error) {
    next(error)
  }
}
