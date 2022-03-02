
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


const getUsers = async(req,res)=>{

        const users = await User.find()

        if(!users){
            res.status(404).json({
                msg: "No se ha encontrado ningun usuario",
                users
            })
        }else{

            res.status(200).json({
                msg: "get- getusers",
                users
            })

        }
    
    
}
const getActiveUsers = async(req,res)=>{

        const query = req.query.active
        const users = await User.find({active: query})

        if(!users){
            res.status(404).json({
                msg: "No se ha encontrado ningun usuario",
                
            })
        }else{

            res.status(200).json({
                msg: "get- getusers",
                users
            })

        }
    
    
}

const uploadAvatar = (req,res)=>{

    const params = req.params;

    res.json({
        
    })
}


const updateUser = async(req,res)=>{

    const userData = req.body;
    const {id} = req.params;

        if(userData.password){
            const salt = bcrypt.genSaltSync(11);
           userData.password = bcrypt.hashSync(userData.password,salt)
        }

       const result = await User.findByIdAndUpdate(id,userData)

       if(!result){

           return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            })
       }else{

          return res.status(200).json({
              ok: true,
              msg: "Usuario actualizado correctamente"
           })
       }
   
}

const activateUser = async(req,res)=>{

    const {id}  = req.params

    const {active} = req.body;

   const result = await User.findByIdAndUpdate(id,{active})

   if(!result){

        return res.status(404).json({
            ok: false,
            msg: "Usuario no encontrado"
        })
    }else{

        return res.status(200).json({
            ok: true,
            msg: "Usuario desactivado correctamente"
        })
    }

}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getActiveUsers,
    updateUser,
    activateUser
}