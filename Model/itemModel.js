const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"enter name of item"]
    },
    quantity:{
        type:Number
    }
})

const Item = mongoose.model('Item',itemSchema);
module.exports = Item;