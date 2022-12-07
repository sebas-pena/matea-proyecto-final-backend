const { Schema, model } = require("mongoose")

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  images: [String],
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
/* 
{
    title: "Garantía",
    details: [
      {
        title: "Duración",
        value: "1 año",
      },
      {
        title: "Dirección Service",
        value: "Canelones 2179",
      },
      {
        title: "Teléfono",
        value: "2400 4008",
      },
    ],
  },
*/

module.exports = model("Product", ProductSchema)