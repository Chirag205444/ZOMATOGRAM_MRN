const foodpartnerModel=require('../models/foodpartnerModel');
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');

const authfoodpartnerMiddleware=async(req,res,next)=>{
    const token=req.cookies.zom_part_token;
    if(!token){
        return res.status(401).json({message:"unauthorized..!, please login"});
    }
   
    try{
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        const foodpartner=await foodpartnerModel.findById(decoded.id);
        if(!foodpartner){
            return res.status(401).json({message:"unauthorized..!, please login"});
        }
        req.foodpartner=foodpartner;
        next();
    }catch(error){
        return res.status(401).json({message:"invalid token..!, please login again"})
    }
}

const authUserMiddleware=async(req,res,next)=>{
    const token=req.cookies.zom_user_token;
    if(!token){
        return res.status(401).json({message:"unauthorized..!, please login"});
    }
    try{
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        const user=await userModel.findById(decoded.id);
        
        req.user=user;
        next();        
    }catch(error){
        return res.status(401).json({message:"invalid token..!, please login again"})
    }
}

module.exports={authfoodpartnerMiddleware,authUserMiddleware}