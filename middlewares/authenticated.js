const jwt = require("jwt-simple");

const moment = require("moment")

const tokenAuthentication = (req,res,next)=>{

    const {xtoken} = req.headers;
    if(!xtoken){

        res.status(403).json({
            msg: "Error de autenticacion"
        })

    }

    const token = xtoken.replace(/['"]+/g,"");

    try {


        var payload = jwt.decode(token,process.env.SECRET_KEY)

        if(payload.exp <= moment.unix()){
            return res.status(404).json({
                msg: "el token ha expirado"
            })
        }
    } catch (error) {
        return res.status(404).json({
            msg: "token no valido"
        })
    }

    req.user = payload;

    next()
}

module.exports = tokenAuthentication
