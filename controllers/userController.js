
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const User = require("../models/user");


const signUp = async(req,res)=>{

    const {name,email,password,repeatPassword} = req.body;

    if(!password || !repeatPassword){
        res.status(400).json({
            msg: "Las contraseñas son obligatorias"
        })
    }
    if(password !== repeatPassword){
        res.status(400).json({
            msg: "las contraseñas no son iguales"
        })
    }

    const data = {
        email,
        name,
        password,
        role: "admin",
        active: true
    }

    const user =  new User(data);

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password,salt);

    try {
        
        await user.save()
        res.status(200).json({

            msg: "Usuario Creado",
                user
        })

    } catch (error) {
        res.status(400).json({
            msg: "error verifique bien los campos"
        })
    }

}

module.exports = {
    signUp
}