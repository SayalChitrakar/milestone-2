const mongoose = require('mongoose');

const Item =require('./../Model/itemModel');
const Cart = require('./../Model/cartModel');
const Checkout= require('./../Model/checkOutModel');

exports.getAllItem = async(request,response)=>{

    try{

        const item = await Item.find();
        response
            .status(200)
            .json({
                data:item
            })
    }
    catch(error){
        console.log(error);
        console.log("error while getting all items");
    }

}

exports.addItem = async(request,response)=>{

    try{
        const data = request.body;
        const quantity = data.quantity;
        const isItem = await Item.findOne({name:data.name});


        let item;
        if(!isItem){
            item = await Item.create(data);
        }
        else{
            const existingQuantity = isItem.quantity;
            const finalQuantity = quantity + existingQuantity;
            item = await Item.findOneAndUpdate({name:data.name},{quantity:finalQuantity},{new:true});
        }
        response
            .status(200)
            .json({
                data:item
            })
    }
    catch(error){
        console.log(error);
        console.log('error in adding item');
    }
}

exports.deleteItem = async(request,response,next)=>{

    try{
        const itemId = request.params.id;
        const item = await Item.findByIdAndDelete(itemId);

        if(!item){
                return next(new Error("no item to delete"));
        }

        response
            .status(204)
            .json({
                status:'success',
                message:"item deleted",
                data:null
            })

    }
    catch(error){
        console.log("error while deleting item");
    }

}

exports.updateItem = async(request,response)=>{

    try{
        const itemId = request.params.id;
        const data = request.body;

        const item = await Item.findByIdAndUpdate(itemId,data,{new:true});

        response
            .status(200)
            .json({
                status:"success",
                data:item
            })
    }
    catch(error){

        console.log(error);
    }
}

exports.addToCard = async (request,response)=>{

    try{
        const data = request.body;



    }
    catch(error){

        console.log("error while adding to cart");
    }


}

exports.getAllCart = async (request,response,next)=>{

    try{

        const cart = await Cart.find();
        response
            .status(200)
            .json({
                message:"success",
                data:cart
            })
    }
    catch(error){
        console.log("error in getting all carts");
    }
}


exports.getAllCheckout = async(request,response,next)=>{

    try{

        const cart = await Checkout.find();
        response
            .status(200)
            .json({
                message:"success",
                data:cart
            })
    }
    catch(error){
        console.log("error in getting all carts");
    }
}

exports.addToCart = async(request,response,next)=>{

    console.log("running");
    try{
        const itemId = request.params.id;
        const data = request.body;
        const finalData = {
            "name":data.name,
            "email":data.email,
            "address":data.address,
            "quantity":data.quantity,
            "item":itemId

        }
        const isItem = await Item.findById(itemId);
        if(!isItem){
            return(next(new Error("no such item found")));
        }
        const existingQuantity = isItem.quantity;
        const finalQuantity = existingQuantity-data.quantity;

        if(finalQuantity<0){
            return(next(new Error("too many item, reduce the quantity")));
        }
        await Item.findByIdAndUpdate(itemId,{quantity:finalQuantity},{new:true});
        const cart = await Cart.create(finalData);

        response
            .status(200)
            .json({
                status:"success",
                data:cart
            })
    }
    catch(error){
        console.log("error while adding to cart");
    }
}

exports.checkOut = async(request,response,next)=>{

    console.log("running");
    try{
        const itemId = request.params.id;
        const data = request.body;
        const finalData = {
            "name":data.name,
            "email":data.email,
            "address":data.address,
            "quantity":data.quantity,
            "item":itemId

        }
        const isItem = await Item.findById(itemId);
        if(!isItem){
            return(next(new Error("no such item found")));
        }
        const existingQuantity = isItem.quantity;
        const finalQuantity = existingQuantity-data.quantity;

        if(finalQuantity<0){
            return(next(new Error("too many item, reduce the quantity")));
        }
        await Item.findByIdAndUpdate(itemId,{quantity:finalQuantity},{new:true});
        const checkOut = await Checkout.create(finalData);

        response
            .status(200)
            .json({
                status:"success",
                data:checkOut
            })
    }
    catch(error){
        console.log("error while checking out item");
    }
}
exports.getAllOrders = async(request,response)=>{


    try{
        const checkout = await Checkout.find().populate('item').select("name");
        response
            .status(200)
            .json({
                status:"success",
                data:checkout
            })
    }
    catch(error){
        console.log('error while viewing checkouts');
    }
}