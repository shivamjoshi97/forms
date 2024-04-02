const mongoose = require("mongoose")

const item = mongoose.Schema({
    textfieldvalue : {
        type: String,
        require: true
    },
    imageurls:{
        type:String
    },
    max_marks:{
        type:Number
    },
    observations:{
        type:String
    },
    fieldlable:{
        type:String
    }
});

module.exports = item;