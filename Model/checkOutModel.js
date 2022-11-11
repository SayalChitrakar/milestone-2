const mongoose = require("mongoose");

const checkOutSchema = new mongoose.Schema({

    item:String,
    quantity:Number,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

})

const CheckOut = mongoose.model('CheckOut',checkOutSchema);
module.exports = CheckOut;