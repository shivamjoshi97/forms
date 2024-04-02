const mongoose = require('mongoose');
const item = require("./items");

const ItemDetails = mongoose.Schema({
    Sample_1 : {
        type: String
    },
    Sample_2 : {
        type: String
    },
    Sample_3 : {
        type: String
    },
    Sample_4 : {
        type: String
    },
    Sample_5 : {
        type: String
    }
});

const First_Five = new mongoose.Schema(
    {
        Material_Grade:ItemDetails,
        Master_Batch_Grade:ItemDetails,
        Master_Batch_Percentage:ItemDetails,
        Total_Cycle_Time:ItemDetails,
        Cooling_Time:ItemDetails,
        Appearance:ItemDetails,
        Color:ItemDetails,
        Component_Weight:ItemDetails,
        Packing:ItemDetails
    }
)

module.exports = First_Five;


