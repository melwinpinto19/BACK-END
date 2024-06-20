const mongoose = require("mongoose");

// creating or connceting the 'example' DB .
// 127.0.0.1 is localhost & 27017 is the port in which mongo runs by default
mongoose.connect("mongodb://127.0.0.1:27017/example");

// creating schema:(structure)
let userSchema = {
  name: String,
  id: Number,
  userName:Number,
};

console.log("Hello");

// creating collection named 'user' with specified schema:(table in sql)
module.exports = mongoose.model("user", userSchema);

// ----------------------------CREATE-----------------------------------------------
// Inserting data into the collection
// const data = await user.create({
//   userName: "Melwin19",
//   name: "Melwin",
//   id: 101,
// });

// -----------------------------READ--------------------------------------------------
// finding all the documents from the collection
// let data = await user.find();

// finding one user which matches the specified condition
// let data = await user.findOne({ name: "Melwin" });

// ---------------------------DELETE-------------------------------------------------
// let data = await user.findOneAndDelete({ name: "Melwin" });


