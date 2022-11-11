const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    item:String,
    quantity:Number

})

const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;