const mongoose = require('mongoose');

const TimeDetails = mongoose.Schema({ 
    T_09: {
        type: String
    },
    T_11: {
        type: String
    },
    T_01: {
        type: String
    },
    T_03: {
        type: String
    },
    T_05: {
        type: String
    },
    T_07: {
        type: String
    },
    Remarks:{
        type: String
    }
});

const Time_Check = new mongoose.Schema(
    {
        Material_Grade:TimeDetails,
        Master_Batch_Grade:TimeDetails,
        Master_Batch_Percentage:TimeDetails,
        Total_Cycle_Time:TimeDetails,
        Cooling_Time:TimeDetails,
        Barrel_Temp:{
            T_1:TimeDetails,
            T_2:TimeDetails,
            T_3:TimeDetails,
            T_4:TimeDetails,
            T_5:TimeDetails,
            T_6:TimeDetails,
            T_7:TimeDetails,
        },
        Visual_Defect:{
            Short_Molding:TimeDetails,
            Shrinkage:TimeDetails,
            Scratches:TimeDetails,
            Stress_mark:TimeDetails,
            Flashes:TimeDetails,
            Black_spot:TimeDetails,
            Flow_marks:TimeDetails,
            Silver_marks:TimeDetails,
            Crack:TimeDetails
        },
        Color:TimeDetails,
        Weight:TimeDetails
    }
)

module.exports = Time_Check;


