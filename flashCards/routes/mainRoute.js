const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  req.slogan = "LFG";
  console.log("Good");
  // const err = new Error("something is wrong");
  // err.status = 500;
  next();
});

router.use((req, res, next) => {
  console.log(req.slogan);
  console.log("Great");
  next();
});

router.get("/", (req, res) => {
  if (req.cookies.address !== undefined) {
    res.render("index", { address: req.cookies.address });
  } else {
    res.redirect("/Hello");
  }
});

router.post("/reset", (req, res) => {
  res.clearCookie("address");
  res.redirect("/Hello");
});

router.get("/connect", (req, res) => {
  // res.locals.balance = "77 ETH";
  res.render("wallet", { wallet: "Metamask", balance: "30 ETH" });
});

router.get("/Hello", (req, res) => {
  if (req.cookies.address !== undefined) {
    res.redirect("/");
  } else {
    res.render("hello");
  }
});

router.post("/Hello", (req, res) => {
  // console.dir(req.body);
  res.cookie("address", req.body.address); //body contains the form data
  res.redirect("/");
  // res.json(req.body);
});

module.exports = router;
