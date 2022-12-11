const CART = require("../models/cart")

const addToCart = (req, res, next) => {
  const uid = req.user._id
  const { productId } = req.body

  CART.findOne({ uid })
    .then(cart => {
      console.log(cart)
      const product = cart.products.find(product => product.productId === productId)
      if (product) {
        product.units++
        CART.findOneAndUpdate({ uid, "products.productId": productId },
          {
            $set: {
              "products.$": {
                units: product.units
              }
            }
          },
          { new: true }
        )
          .then(cart => {
            res.status(200).json(cart)
          })
          .catch(console.log)
      }

    })

  CART.findOneAndUpdate({ uid }, {
    $set: {
      products
    }
  }, {
    new: true
  }).populate("products.product", { _id: 0 }).then(cart => {
    console.log(cart)
    res.status(200).json(cart)
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