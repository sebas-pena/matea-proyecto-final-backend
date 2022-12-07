const Product = require("../models/product")

const createProduct = (req, res, next) => {
  const { title, images, price, currency, sale, specs } = req.body
  const product = new Product({ title, images, price, currency, sale, specs })

  product.save((err) => {
    if (err) {
      res.status(500).json({ msg: "ERROR AL REGISTRAR PRODUCTO" })
      console.log(err)
    } else {
      res.status(200).json({ msg: "PRODUCTO REGISTRADO" })
    }
  })
}

const getProduct = (req, res, next) => {
  const { category, id, title } = req.query

  if (id) {
    Product.findById(id).then((product) => {
      if (product) res.stauts(200).json(product)
      else next({ statusCode: 404, message: "Item not found." })
      return
    })
  } else {
    const search = {}
    category && (search.category = category)
    title && (search.title = title)
    console.log(search)
    Product.find(search).then((products) => {
      if (products.length) res.status(200).json({ products })
      else next({ products })
    })
  }
}

module.exports = {
  createProduct,
  getProduct,
}
