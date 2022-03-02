const express = require("express");
const { signUp, signIn, getUsers, getActiveUsers, updateUser, activateUser } = require("../controllers/userController");
const tokenAuthentication = require("../middlewares/authenticated");

const Route = express.Router();


Route.post("/signup", signUp)


Route.post("/signin", signIn)


Route.get("/users", tokenAuthentication,getUsers)

Route.get("/users-active", tokenAuthentication,getActiveUsers)

Route.put("/users/:id",updateUser)

Route.put("/users/activate-user/:id",activateUser)




module.exports = Route