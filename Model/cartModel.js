const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    name :String,
    email :String,
    address:String,
    item: {
        type:mongoose.Schema.ObjectId,
        ref:'Item'
    },
    quantity:Number

})

const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;