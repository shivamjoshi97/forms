const mongoose = require('mongoose');

const TemplateForm = new mongoose.Schema(
    {
        auditname:{
            type:String
        },
        templatename:{
            type:String
        },
        template_detail:{
            type:Object
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
)
//collection creation
const TemplateDetails = mongoose.model('TemplateDetails',TemplateForm);
module.exports = TemplateDetails;


