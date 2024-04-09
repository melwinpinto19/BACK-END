const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/ExampleDB");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: {
    type: String,
    default: "",
  },
});

userSchema.plugin(plm);

const User = mongoose.model("User", userSchema);

module.exports = User;
