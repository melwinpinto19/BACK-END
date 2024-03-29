var express = require("express");
var router = express.Router();
let user = require("./users");

/* GET home page. */
router.get("/create", async function (req, res, next) {
  // res.render("index");
  const data = await user.create({
    userName: "hfhdf",
    name: "Harsha",
    id: 102,
  });
  res.send(data);
});

router.get("/find", async (req, res) => {
  let data = await user.find();
  res.send(data);
});

router.get("/findOne", async (req, res) => {
  let data = await user.findOne({ name: "Melwin" });
  res.send(data);
});

router.get("/delete", async (req, res) => {
  let data = await user.findOneAndDelete({ name: "Harsh" });
  res.send(data);
});

// cookies and sessions:
/*
cookie - browser [res.cookie(),res.clearCookie(),req.cookies]
session -server
*/

// cookies:
router.get("/setCookie/", (req, res) => {
  // setting the cookie for the browser and it is set to only that browser from which request came
  res.cookie("data", 500);
  res.send("Cookie is set");
});

router.get("/getCookie", (req, res) => {
  // printing the cookie
  res.send(req.cookies);
});

router.get("/removeCookie", (req, res) => {
  // removing the cookie
  res.clearCookie("data");
  res.send("coookies removed");
});

// sessions:(session data is refreshed when the server is restarted)
router.get("/setSession/", (req, res) => {
  // settting the sesssion
  req.session.data = 450;
  res.send("Session is set");
});

router.get("/getSession/", (req, res) => {
  // getting the session
  res.send(req.session);
});

module.exports = router;

/*
Mongodb
db contains diff types of collections(tables)
each record in collections is called document

Model   -collections
schema  -structure
*/
