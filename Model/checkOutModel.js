const mongoose = require("mongoose");

const checkOutSchema = new mongoose.Schema({

    name :String,
    email :String,
    address:String,
    item: {
        type:mongoose.Schema.ObjectId,
        ref:'Item'
    },
    quantity:Number

})

const CheckOut = mongoose.model('CheckOut',checkOutSchema);
module.exports = CheckOut;