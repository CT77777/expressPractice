const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded());
app.use(cookieParser());
app.use("/static", express.static("public"));

app.set("view engine", "pug");

const mainRoute = require("./routes/mainRoute.js");
const whiteListRoute = require("./routes/whiteListRoute.js");
app.use(mainRoute);
app.use("/whitelist", whiteListRoute);

// create 404 error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // res.locals.error = err;
  res.status(err.status);
  res.render("error", { error: err });
});

app.listen(3000, () => {
  console.log(`you're running localhost:3000.`);
});
