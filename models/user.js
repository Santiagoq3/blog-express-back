const {Schema,model} = require("mongoose");


const UserSchema = Schema({
    name: String,
    lastname: String,
    email:{
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active:{
        type: Boolean,
        default: false
    }
});

module.exports = model("User",UserSchema);