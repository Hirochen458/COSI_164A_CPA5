const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");


const app = express();
app.enable('verbose errors');
//It serves static files
app.use(express.static("public"));
//ejs engine, convert .ejs to .html, expect .ejs in views
app.set("view engine", "ejs");
//enable layouts
app.use(layouts);

//listen port 3001
app.set("port", process.env.PORT || 8080);

//home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});
//About us page
app.get("/About", homeController.About);
//Contact page
app.get("/Contact", homeController.Contact);
//Events page
app.get("/Events", homeController.Events);
//Jobs page
app.get("/Jobs", homeController.Jobs);
//Login page
app.get("/Login", homeController.Login);
//log erroe
app.use(errorController.logErrors);
//404 error handler
app.use(errorController.pageNotFoundError);
//500 error handler
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`The server is running at http://localhost:${app.get("port")}`);
});

