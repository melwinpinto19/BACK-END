var express = require("express");
var router = express.Router();
let userModel = require("./users");
let passport = require("passport");
let localStrategy = require("passport-local");
let productModel = require("./product");
let productUpload = require("./productUpload");
let fs = require("fs");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/home", isLoggedIn, (req, res) => {
  res.render("home");
});

router.get("/admin", (req, res) => {
  res.render("admin");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let data = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("cart");
  let cart1 = await data.cart;
  res.render("cart", { cart: cart1 });
});

router.post("/getCartItems", isLoggedIn, async (req, res) => {
  let data = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("cart");
  let cart1 = await data.cart;
  res.json(cart1);
});

router.post("/removeCartItem", isLoggedIn, async (req, res) => {
  let data = await userModel.findOne({ username: req.session.passport.user });
  let index = await data.cart.indexOf(req.body.id);
  await data.cart.splice(index, 1);
  await data.save();
  let data1 = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("cart");
  res.json(await data1.cart);
});

router.post("/getProducts", async (req, res, next) => {
  let data = await productModel.find();
  res.json(data);
});

router.post("/removeProduct", async (req, res) => {
  let data = await productModel.findByIdAndDelete(req.body.id);
  fs.unlink(`./public/images/products/${data.imageUrl}`, (err) => {
    if (err) {
      console.log("error in deleting the file");
      console.log(data.imageUrl);
    } else {
      console.log("File deleted succesfully");
    }
  });

  res.json(data);
});

router.post("/addToCart", isLoggedIn, async (req, res) => {
  let data = await userModel.findOne({ username: req.session.passport.user });
  if (!(await data.cart.includes(req.body.id))) {
    await data.cart.push(req.body.id);
    await data.save();
    res.send("Item is added to cart");
  } else {
    res.send("Item already exists");
  }
});

router.post(
  "/addProduct",
  productUpload.single("file"),
  async (req, res, next) => {
    if (!req.file) {
      res.status(404).send("No files were given");
    }
    console.log("Hello");

    let data = await productModel.create({
      imageUrl: req.file.filename,
      name: req.body.name,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      category: req.body.category,
      stock: Number(req.body.stock),
      backgroundColor: req.body.backgroundColor,
      panelColor: req.body.panelColor,
      textColor: req.body.textColor,
    });

    res.send(data);
  }
);

// register route
router.post("/register", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
  });
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    });
});

// login:
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

// logout:
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
