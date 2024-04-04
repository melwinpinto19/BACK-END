var express = require("express");
var router = express.Router();
const user = require("./users");
const users = require("./users");

/*->flash messages:These are the messages which give info about something like warning error etc.
EG:login failed page
->to use flash messages we have to use 'connect-flash' pkg and 'express-session' pkg
->flash mesages means creating the data in one route and using it in another route
->flash data resets when the server is refreshed
*/

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.get("/setFlash", function (req, res, next) {
  req.flash("age", 45);
  res.send("created");
});
router.get("/getFlash", function (req, res, next) {
  res.send(req.flash("age"));
});

// Intermediate mongo:
router.get("/create", async function (req, res, next) {
  let data = await user.create({
    username: "Harsh",
    nickname: "Harry",
    description: "Js developer",
    categories: ["fashion", "sports", "java", "UX"],
  });

  res.send(data);
});

router.get("/find", async function (req, res, next) {
  let data = await user.find();
  res.send(data);
});

// incasesitive search:
router.get("/one", async function (req, res, next) {
  //(1) ^-startswith ,$-endswith
  // finds the data with the username where the value is "harsh" and it is case insesitive
  // res.send(await user.find({ username: RegExp("^haRsh$", "i") }));

  //(3) searh within an specified range:
  // let data = await user.find({
  //   createdDate: { $lte: new Date('2024-04-02'), $gte: new Date('2024-03-02') },
  // });
  // res.send(data);

  // (4)checking the existence of the entries:
  // res.send(
  //   await user.find({
  //     createdDate: { $exists: true },
  //   })
  // );

  //(5) finding the data based on specific fields length 
  // $expr takes complex expresions for comparisions
  res.send(
    await user.find({
      $expr: {
        $and: [
          { $gte: [{ $strLenCP: "$nickname" }, 0] },
          { $lte: [{ $strLenCP: "$nickname" }, 3] },
        ],
      },
    })
  );
});

router.get("/two", async function (req, res, next) {
  // (2) finds the users with having the specified category:
  res.send(
    await user.find({
      categories: { $all: ["fashion", "UX"] },
    })
  );
});

module.exports = router;
