/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expresLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")
/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expresLayouts)
app.set("layout","./layouts/layout")

/* ***********************
 * Routes
 *************************/
app.use(static)
app.use("/inv", inventoryRoute)
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))
app.use(async (req, res, next) => {
  next({status: 500, message: 'Sorry, we appear to have lost that page.',
    status: 404, message: 'Sorry, we appear to have lost that page.'}
  )
})
/* ***********************
 * Express error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  console.error(err.status)
  if(err.status == 404)
    { message = '<p>We currently do not have that model, so here is the latest 404 model.</p><img src="/images/site/404Image.jpg" width="300" height="300" alt="Image of 404 image"/>'} 
  else if(err.status == 500)
  {message = '<p>Oops!, something went wrong</p><img src="/images/site/500_error.webp" width="300" height="400" alt="Oops!"/>'}
  else{
    message = '<p>Not sure what happened, but we will look into it.</p>'
  }
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})
/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
