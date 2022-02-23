
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { createAccessToken, createRefreshToken } = require("../helpers/jwt");
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
        email: email.toLowerCase(),
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
            user,
            ok: true
        })

    } catch (error) {
        res.status(400).json({
            msg: "error verifique bien los campos",
            ok:false
        })
    }

}


const signIn = async(req,res)=>{

    const {email,password} = req.body;

    email.toLowerCase()


    try {
        
        const user = await User.findOne({email})

        if(!user){
          return res.json({
                msg:"Usuario no encontrado",
                ok: false
            })
        }

        const validPassword = bcrypt.compareSync(password,user.password)

        if(!validPassword){
            return res.status(400).json({
                msg: "La contraseña no es correcta",
                ok: false
            }
            )
        }

        const token = createAccessToken(user);
        const refreshToken = createRefreshToken(user);


        res.status(200).json({
            msg: "Logueado",
            user,
            token,
            refreshToken,
            ok: true
        })
    } catch (error) {
        console.log(error);
        
        res.status(400).json({
            msg: "Error, vuelva a intentarlo",
            ok: false
        })
    }



    
}

module.exports = {
    signUp,
    signIn
}