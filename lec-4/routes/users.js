const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/UsersDB");

const schema = mongoose.Schema({
  username: String,
  nickname: String,
  description: String,
  categories: {
    type: Array,
    // setting default value if not provided
    default: [],
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", schema);
