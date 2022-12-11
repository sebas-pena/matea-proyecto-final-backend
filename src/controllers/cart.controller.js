const CART = require("../models/cart")

const addToCart = (req, res, next) => {
  const uid = req.user._id
  const { productId } = req.body
  CART.findOne({ uid })
    .then(cart => {
      const product = cart.products.find(product => product.productId == productId)
      if (product) {
        CART.findOneAndUpdate({ uid, "products.productId": productId },
          {
            $set: {
              "products.$": {
                productId,
                units: req.body.units || ++product.units
              }
            }
          },
          { new: true }
        )
          .populate("products.product", { _id: 0 })
          .then(cart => {
            res.status(200).json(cart)
          })
          .catch(console.log)
      }
      else {
        CART.findOneAndUpdate({ uid },
          {
            $push: {
              products: {
                productId,
                units: req.body.units || 1
              }
            }
          },
          { new: true }
        )
          .populate("products.product", { _id: 0 })
          .then(cart => {
            res.status(200).json(cart)
          })
          .catch(console.log)
      }
    })

}

const getCart = (req, res, next) => {
  CART.findOne({ uid: req.user._id }).populate("products.product", { _id: 0 })
    .then(cart => res.status(200).json(cart))
}

module.exports = {
  addToCart,
  getCart
}