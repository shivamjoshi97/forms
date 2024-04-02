const mongoose = require('mongoose');
const F_11 = require("./From1Schema");
const First_Five = require("./FirstFiveSchema");
const Time_Check = require('./TimeCheckSchma');
const Daily_Process = require('./DailyCheckSchema');
const Daily_Line = require('./DailyLineSchema');
const AuditSchema = new mongoose.Schema(
    {
        audit_name:{
            type:String,
            require:true
        },
        FormName:{
            type:String
        },
        F_11 : F_11,
        First_Five:First_Five,
        Time_Check:Time_Check,
        Daily_Line:Daily_Line,
        Daily_Process:Daily_Process,
        date:{
            type:Date,
            default:Date.now
        }
    }
)
//collection creation
const Audit = mongoose.model('Audit',AuditSchema);
module.exports = Audit;


