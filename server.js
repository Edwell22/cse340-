const utilities = require("./utilities");
const baseController = require("./controllers/baseController");
const express = require('express');
const app = express();
const path = require ('path');
const expressLayouts = require ('express-ejs-layouts');
const { title } = require('process');
const inventoryRoute = require("./routes/inventoryRoute")

// Set EJS as the  view engine and use layouts
app.set('view engine', 'ejs') ;
app.use(expressLayouts);

//Serve static files  from  the public directory
app.use (express.static(path.join(__dirname, 'public')));

// Define layouts directory
app.set('layout', 'layouts/layout');

//Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page'});
});
// Inventory routes
app.use("/inv", inventoryRoute);

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us'});
});

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));


// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

//Start the server
const PORT =  5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// /* ******************************************
//  * This server.js file is the primary file of the 
//  * application. It is used to control the project.
//  *******************************************/
// /* ***********************
//  * Require Statements
//  *************************/
// const express = require("express")
// const expressLayouts = require("express-ejs-layouts")
// const env = require("dotenv").config()
// const app = express()
// const static = require("./routes/static")

// /* ***********************
//  * Routes
//  *************************/
// app.use(require("./routes/static"))

// //index routes
// app.get("/",function(req, res){
//   res.render("index", {title: "Home"})})

// // View Engine and Templates



// app.set("view engine", "ejs")
// app.use(expressLayouts)
// app.set("layout", "./layouts/layout") // not at views root
// app.set('partials', './views/partials')


// app.use(static)

// /* ***********************
//  * Local Server Information
//  * Values from .env (environment) file
//  *************************/
// const port = process.env.PORT
// const host = process.env.HOST

// /* ***********************
//  * Log statement to confirm server operation
//  *************************/
// app.listen(port, () => {
//   console.log(`app listening on ${host}:${port}`)
// })
