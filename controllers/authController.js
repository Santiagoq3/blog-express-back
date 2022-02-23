const { createRefreshToken, decodedToken, createAccessToken } = require("../helpers/jwt");
const moment = require("moment");
const User = require("../models/user");


const willExpiredToken = (token)=>{

    const {exp} = decodedToken(token);
    const currentDate = moment().unix();

    if(currentDate > exp){

        return true
    }else{
        return false
    }

}

const refreshTokenController = (req,res)=>{

    const {refreshToken} = req.body;

    const isTokenExpired = willExpiredToken(refreshToken);


    if(isTokenExpired){
       return res.status(400).json({
            msg: "El token a Expirado"
        })
    }else{
        const {id} = decodedToken(refreshToken)

        try {
            
            const user = User.findOne({_id: id})
            res.json({
                accessToken: createAccessToken(user),
                refreshToken
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "error en el servidor"
            })
        }
    }
   
}


module.exports = {
    refreshTokenController
}