const mongoose = require('mongoose');

const DailyItem = mongoose.Schema({
    observation : {
        type: String
    },
    remarks : {
        type: String
    },
    label : {
        type: String
    },
    imageurl:{
        type:String
    }
});

const Daily_Process = new mongoose.Schema(
    {
        Work_Station:{
            Lux_Level:DailyItem,
            five_s:DailyItem,
            is_organized:DailyItem , 
            is_safe:DailyItem ,
            is_bins_present:DailyItem , 
            is_bins_identified:DailyItem , 
            defect_identify:DailyItem , 
            other_part_available:DailyItem , 
        },
        Part_Product:{
            work_isntruction:DailyItem , 
            should_match:DailyItem , 
            is_updated:DailyItem , 
            inspection_report:DailyItem , 
            is_performing_job:DailyItem , 
            is_match_fp:DailyItem , 
            is_match_tc:DailyItem , 
        },
        Process:{
            daily_fixture:DailyItem ,
            part_packing:DailyItem , 
        },
        Voice_of_the_customer:{
            quality_alert:DailyItem , 
        }
    }
)

module.exports = Daily_Process;


