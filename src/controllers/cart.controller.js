const CART = require("../models/cart")

const updateCart = (req, res, next) => {
  const uid = req.user._id
  let { productId, units } = req.body
  CART.findOne({ uid })
    .then(cart => {
      if (!cart) {
        next({ statusCode: 401, message: "Unauthorized." })
        return
      }
      const product = cart.products.find(product => product.productId == productId)

      if (product && units < 0) {
        CART.findOneAndUpdate({ uid },
          {
            $pull: {
              products: {
                productId,
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
      } else if (product) {
        if (units === undefined) units = ++product.units
        CART.findOneAndUpdate({ uid, "products.productId": productId },
          {
            $set: {
              "products.$": {
                productId,
                units
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
      } else {
        if (units === undefined) units = 1
        CART.findOneAndUpdate({ uid },
          {
            $push: {
              products: {
                productId,
                units
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

const setCart = (req, res, next) => {
  CART.findOneAndUpdate({ uid: req.user._id }, {
    $set: {
      products: req.body
    }
  }, { new: true })
    .populate("products.product", { _id: 0 })
    .then(cart => {
      res.status(200).json(cart)
    })
}

module.exports = {
  updateCart,
  getCart,
  setCart
}