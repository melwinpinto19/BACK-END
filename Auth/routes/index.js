/*
Authentication & authorization:
passport pkg contains all the code for login & register
passport-local pkg is an statergy like 'login with google' 'login with github'
passport-local-mongoose pkg contains encryption & decryption related code
*/

var express = require("express");
var router = express.Router();
let userModel = require("./users");
let passport = require("passport");
let localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// profile:
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

// register route
router.post("/register", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

// login:
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
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
