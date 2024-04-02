const mongoose = require('mongoose');

const LableItem = mongoose.Schema({
    name:{
        type:String
    },
    Observation:{
        type:Boolean
    },
    Before_Pic: {
        type:Boolean
    }, 
    After_Pic: {
        type:Boolean
    },
    Target: {
        type:Boolean
    },
    Responsibility: {
        type:Boolean
    }
});

const TemplateSchema = new mongoose.Schema(
    {
        template_name:{
            type:String,
            require:true
        },
        header_details:[{
            header_name:{
                type:String
            },
            header_subheading:[{
                type:LableItem
            }]
        }],
        date:{
            type:Date,
            default:Date.now
        }
    }
)
//collection creation
const Template = mongoose.model('Template',TemplateSchema);
module.exports = Template;


