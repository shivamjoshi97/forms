const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
}).then(()=>{
    console.log('DB Connection sucessfull');
}).catch((err)=> console.log(err));