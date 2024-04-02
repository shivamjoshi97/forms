const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const formUserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        admin:{
            type:Boolean,
            default:false
        },
        date:{
            type:Date,
            default:Date.now
        },
        tokens:[
            {
                token:
                {
                    type:String,
                    required:true
                }
            }
        ]
    }
)

formUserSchema.pre('save', async function(next)
{
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

formUserSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SKEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}
 
//collection creation
const FormUser = mongoose.model('FORMUSER',formUserSchema);
module.exports = FormUser;



//collection creation
// const AppUser = mongoose.model('AppUser',AppuserForm);
// module.exports = AppUser;


