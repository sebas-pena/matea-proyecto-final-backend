const { Schema, model } = require("mongoose")

const ProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  units: {
    type: Number,
    default: 1
  },
  _id: false
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

const CartSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  products: [ProductSchema]
})


ProductSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: "true"
})

module.exports = model("Cart", CartSchema)