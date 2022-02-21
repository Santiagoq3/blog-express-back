const mongoose = require("mongoose");
const app = require("./app");
const { API_VERSION } = require("./config");
const dotenv = require("dotenv")

dotenv.config()


const port = process.env.PORT || 8080;


try {
    
    mongoose.connect(process.env.dbConnection,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    })

    console.log("conectado a Mongodb");
}catch (err) {
    console.log("error al conectar db");
    console.log(err);
}

app.listen(port, ()=>{
    console.log("conectado en el puerto" + port);
})