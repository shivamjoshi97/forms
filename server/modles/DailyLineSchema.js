const mongoose = require('mongoose');

const DailyLineItem = mongoose.Schema({
    observation : {
        type: String
    },
    remarks : {
        type: String
    },
    label : {
        type: String
    },
    judgement:{
        type: String
    }
});

const Daily_Line = new mongoose.Schema(
    {
        Basic_Follow:{
            Hand_Gloves:DailyLineItem,
            Lux_Level_1:DailyLineItem,
            Lux_Level_2:DailyLineItem,
            Sahrp_Edge:DailyLineItem ,
            LQC:DailyLineItem
        },
        Self:{
            appearance:DailyLineItem ,
            worker_self:DailyLineItem  ,
            each_worker_self:DailyLineItem
        },
        FoolProof:{
            is_follproof:DailyLineItem,
        },
        M_4:{
            new_operator:DailyLineItem,
            basic_training:DailyLineItem,
        },
        Other:{
            packing:DailyLineItem,
            storage_clean:DailyLineItem,
            no_dust:DailyLineItem,
        }
    }
)

module.exports = Daily_Line;


