const mongoose = require('mongoose');
const Item =require('./../Model/itemModel');

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