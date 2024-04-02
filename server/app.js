const dotenv = require("dotenv");
const express = require('express');

const app = express();
dotenv.config({path: './config.env'});
require('./db/conn');
app.use(require('./router/auth'));

const PORT  = process.env.PORT || 5000;
app.use(express.json());


//3 
if(process.env.NODE_ENV = "production"){
    app.use(express.static("client/build"));
}

//Listen To the port
app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`);
});

