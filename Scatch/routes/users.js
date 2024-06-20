const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Scatch");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
