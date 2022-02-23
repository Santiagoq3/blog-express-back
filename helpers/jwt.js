const jwt = require("jwt-simple");
const moment = require("moment");

const createAccessToken = (user)=>{

    const payload ={

        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        createdToken: moment().unix(),
        exp: moment().add(3,"hours").unix()
    };

    return jwt.encode(payload,process.env.SECRET_KEY)
}


const createRefreshToken = (user)=>{

    const payload = {
        id: user._id,
        exp: moment().add(30,"days").unix()
    }


    return jwt.encode(payload,process.env.SECRET_KEY)
}


const decodedToken = (token)=>{

    return jwt.decode(token,process.env.SECRET_KEY, true)
    
}



module.exports = {
    createAccessToken,
    createRefreshToken,
    decodedToken
}