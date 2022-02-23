const express = require("express");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./config");
const cors = require("cors")

const app = express()

const userRoute = "/users"
const authRoute = "/auth"


const userRoutes = require("./routes/userRoute")
const authRoutes = require("./routes/authRoute")

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(userRoute,userRoutes)
app.use(authRoute,authRoutes)


module.exports = app










