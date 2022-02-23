

const express = require("express");
const { refreshTokenController } = require("../controllers/authController");



const Route = express.Router();



Route.post("/refresh-token", refreshTokenController)






module.exports = Route