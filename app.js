const express = require("express");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./config");


const app = express()

const userRoute = "/users"


const userRoutes = require("./routes/userRoute")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(userRoute,userRoutes)


module.exports = app










