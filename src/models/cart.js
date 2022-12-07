const { Schema, model } = require("mongoose")

const CartSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "Product",
    _id: false,
  }]
})

/* 
  CartSchema.virtual("products", {
    ref: "Product",
    localField: "products.product_id",
    foreignField: "_id",
    justOne: "false"
  })
 */
module.exports = model("Cart", CartSchema)