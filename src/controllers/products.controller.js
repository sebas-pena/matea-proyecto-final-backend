const Product = require("../models/product")

const createProduct = (req, res, next) => {
  Product.create(req.body)
    .then(docs => {
      console.log(docs)
      res.status(201).json(docs)
    })
    .catch(e => {
      console.log(e)
      next({ message: "Internal server error" })
    })
}

const getProduct = async (req, res, next) => {
  const { category, id, title, page = 1, limit = 10, sale } = req.query

  if (id) {
    Product.findById(id).then((product) => {
      if (product) res.status(200).json(product)
      else next({ statusCode: 404, message: "Item not found." })
      return
    })
  } else {
    const search = {}
    category && (search.category = category)
    if (sale) {
      search.sale = { $gt: 0 }
    }
    title && (search.title = title)
    const products = await Product.find(search)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Product.find(search).countDocuments()
    console.log(search)

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })

  }
}

module.exports = {
  createProduct,
  getProduct,
}
