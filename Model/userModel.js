const crypto = require('crypto');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:[true,"you must enter your name"]
    },
    email:{

        type:String,
        required:[true,'you must enter email'],
        validate:{
            validator:(email)=>{
                const emailString = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

                if(email.match(emailString)){
                    return true;
                }
                else{
                    return false;
                }
            },
            message:'please enter valid email'
        }
    },
    password:{
        type:String,
        select:false
    },
    phoneNumber :{
        type:String,
        require:[true,'please enter phone number']
    },
    address :{
        type:String,
        require:[true,'please enter your address']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){next();}
    this.password = await bcrypt.hash(this.password,12);

    next();

});

userSchema.methods.checkPassword = async function(givenPassword,realPassword){

    return await bcrypt.compare(givenPassword,realPassword);
}

const User = mongoose.model('User',userSchema);
module.exports = User;