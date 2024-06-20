const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Scatch");

const productSchema = mongoose.Schema({
  imageUrl: String,
  name: String,
  price: Number,
  discount: Number,
  category: String,
  stock: Number,
  backgroundColor: String,
  panelColor: String,
  textColor: String,
  popularity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", productSchema);
