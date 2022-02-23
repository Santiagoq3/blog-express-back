const express = require("express");
const { signUp, signIn } = require("../controllers/userController");


const Route = express.Router();



Route.post("/signup", signUp)


Route.post("/signin", signIn)




module.exports = Route