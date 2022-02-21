const express = require("express");
const { signUp } = require("../controllers/userController");


const Route = express.Router();



Route.post("/signup", signUp)




module.exports = Route