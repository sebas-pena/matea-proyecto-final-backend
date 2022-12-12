const { Schema, model } = require("mongoose")

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  images: [String],
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  sale: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  },
  category: String,
  specs: {
    type: [
      {
        title: String,
        details: [{
          title: String,
          value: String
        }]
      },
    ],
    default: []
  }
})

module.exports = model("Product", ProductSchema)