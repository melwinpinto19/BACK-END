// nodemon is the package which reduces the burden of restarting the server again and gain

const express = require("express");
const app = express();

// middleware:It is an code which is executed before any route is executed
app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

// localhost:3000/
app.get("/", (req, res) => {
  res.send(`
  <div style="background-color:red;height:50px">Hello</div>
  `);
});

// localhost:3000/profile
app.get("/profile", (req, res) => {
  res.send(`
    <div style="background-color:yellow;height:50px">Hello</div>
    `);
});

// localhost:3000
app.listen(3000, () => {
  console.log(`Example app`);
});
