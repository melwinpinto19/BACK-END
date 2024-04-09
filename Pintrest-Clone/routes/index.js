var express = require("express");
var router = express.Router();
let userModel = require("./users");
let postModel = require("./posts");
let passport = require("passport");
let localStrategy = require("passport-local");
let upload = require("./multer");
let uploadDP = require("./multerDP");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/profile/:username", async (req, res) => {
  let data = await userModel.findOne({ username: req.params.username });

  res.render("profile", { user: data });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { error: req.flash("error") });
});

// profile:
router.get("/profile", isLoggedIn, async (req, res) => {
  let data = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");

  res.render("profile", { user: data });
});

router.get("/register", (req, res) => {
  res.render("register");
});

// register route
router.post("/register", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
    posts: [],
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
    failureFlash: true,
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

// uploading file:
router.post("/upload", isLoggedIn, upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(404).send("No files were given");
  }

  let data = await userModel.findOne({ username: req.session.passport.user });

  let postData = await postModel.create({
    user: data._id,
    postText: req.body.caption,
    imageUrl: req.file.filename,
  });

  await data.posts.push(postData._id);
  await data.save();

  res.send("File uploaded sucessfully");
});

router.post(
  "/uploadDP",
  isLoggedIn,
  uploadDP.single("file"),
  async (req, res) => {
    if (!req.file) {
      res.status(404).send("No files were given");
    }

    let data = await userModel.findOne({ username: req.session.passport.user });
    data.dp = req.file.filename;

    await data.save();
    res.send("Dp uploaded sucessfully");
  }
);

router.get("/feed", async (req, res) => {
  let data = await postModel.find().populate("user");
  let data1 = await postModel.find();
  res.render("feed", { posts: data });
});

router.post("/save", (req, res) => {});

module.exports = router;
