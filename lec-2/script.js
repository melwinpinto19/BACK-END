// What is express and why ?
/*
->Express js is a js library that is used to make the servers using js.
without express even we can make servers using the node js which uses inbuilt http package for doing this.But using http is a bit complex thing that is why express is brought to make that thing easier
->server with Node possible
->server with express easy
->express internally uses the http packgae
*/

/*
req,res,next
req ->This contains the information about the user who has given the request
res ->This will give respnse to the user who has given the request
next->while using the midddleware to move to the route we use the next()
*/

// route parameters:
/*
many times in the url there is similar route but only one value is changing so instead for handling it individullly we can handle it using ':var-name' syntax where 'var-name' is dynamic
eg:
/profiles/harry
/profiles/harsh
/profiles/carry
here /profiles/ is common only last part is changing so we can use /profiles/:user
*/

// code eg:

const express = require("express");
const app = express();

// setting for views folder:
app.set("view engine", "ejs");

// for public folder
app.use(express.static("./public"));

// localhost:3000/home/
app.get("/home/", (req, res) => {
  // name is the parameter that is pssed to the index page
  res.render("home");
});
// localhost:3000/login/
app.get("/login/", (req, res) => {
  // name is the parameter that is pssed to the index page
  res.render("index",{user:" "});
});
// localhost:3000/login/:user/
app.get("/login/:user/", (req, res) => {
  // name is the parameter that is pssed to the index page
  res.render("index", { user: req.params.user });
});

app.get("/", (req, res) => {
  res.send();
});

// localhost:3000
app.listen(3000, () => {
  console.log(`Example app`);
});
