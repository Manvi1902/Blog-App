const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String ,
            required:true
          
        },

        email:{
            type:String ,
            required:true
        },

        password:{
            type:String ,
            required:true
        },

       
        tokens:[
            {
                    token: {
                        type:{ type: String},
                       
                    }
            }
        ]
        
    },
    
    {timestamps: true}
);
userSchema.pre('save', async function(next) {

    if(this.isModified('password')){
        
        this.password = await bcrypt.hash(this.password,10);
        console.log(this.password);
        
    }
    next();
});

userSchema.methods.generateAuthToken = async function(next) {

        try{
            let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token:token});
            await this.save();
            return token
        }catch (error){
            console.log(error);
        }
}

 
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
