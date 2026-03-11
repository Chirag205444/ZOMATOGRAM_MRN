const foodModel=require("../models/foodModel");
const { uploadFile } = require("../services/storageservice");
const {v4: uuid} =require("uuid");

const createFood=async(req,res)=>{
    try{
        const {name,description}=req.body;
        const fileuploadresult=await uploadFile(req.file.buffer,uuid());
        const foodItem=await foodModel.create({
            name,
            description,
            video:fileuploadresult.url,
            foodpartner:req.foodpartner._id
        })
        return res.status(201)
        .json({
            message:"food item created successfully",
            fooditem:foodItem
        })
    }catch(error){
        res.status(500).json({message:"internal server error"})
    }
}

const getFoodItems=async(req,res)=>{
    const foodItems=await foodModel.find({});
    return res.status(200).json({
        fooditems:foodItems
    })
}

module.exports={createFood,getFoodItems}