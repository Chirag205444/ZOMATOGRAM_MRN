const userModel=require('../models/userModel');
const foodPartnerModel=require('../models/foodpartnerModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const registerUser=async(req,res)=>{
    const {fullname,email,password}=req.body;

    const isUser=await userModel.findOne({email});
    if(isUser){
        return res.status(400).json({message:"user already exist"})
    }
    const hashedPass=await bcrypt.hash(password,10);

    const user=await userModel.create({
        fullname,
        email,
        password:hashedPass,
    })
    const Zom_token=jwt.sign({id:user._id},process.env.SECRET_KEY)
    res.cookie("zom_user_token",Zom_token)
    return res.status(201).json({
        message:"user successfully created",
        user:{
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
        }
    });
}


const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    const user=await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"user does not exist"})
    }

    const isauthorized=await bcrypt.compare(password,user.password);  
    if(!isauthorized){
        return res.status(400).json({message:"invalid credentials"})
    }

    const Zom_token=jwt.sign({id:user._id},process.env.SECRET_KEY)
    res.cookie("zom_user_token",Zom_token)
    return res.status(201).json({
        message:"user successfully logged in",
        user:{
            _id:user._id,
            fullname:user.fullname,
            email:user.email
        }
    });
}

const logoutUser=async(req,res)=>{
    res.clearCookie("zom_token");
    return res.status(200).json({message:"user successfully logged out"})
}


const registerFoodPartner=async(req,res)=>{
     const {name,email,password,phone,address,contactName}=req.body;

    const ispartner=await foodPartnerModel.findOne({email});
    if(ispartner){
        return res.status(400).json({message:"partner already exist"})
    }
    const hashedPass=await bcrypt.hash(password,10);

    const foodpartner=await foodPartnerModel.create({
        name,
        email,
        password:hashedPass,
        phone,
        address,
        contactName
    })
    const Zom_part_token=jwt.sign({id:foodpartner._id},process.env.SECRET_KEY)
    res.cookie("zom_part_token",Zom_part_token)
    return res.status(201).json({
        message:"partner successfully created",
        user:{
            _id:foodpartner._id,
            name:foodpartner.name,
            email:foodpartner.email,
            phone:foodpartner.phone,
            address:foodpartner.address,
            contactName:foodpartner.contactName
        }
    });
}

const loginFoodPartner=async(req,res)=>{
    const {email,password}=req.body;

    const foodpartner=await foodPartnerModel.findOne({email});
    if(!foodpartner){
        return res.status(400).json({message:"partner does not exist"})
    }

    const isauthorized=await bcrypt.compare(password,foodpartner.password);  
    if(!isauthorized){
        return res.status(400).json({message:"invalid credentials"})
    }

    const Zom_part_token=jwt.sign({id:foodpartner._id},process.env.SECRET_KEY)
    res.cookie("zom_part_token",Zom_part_token)
    return res.status(201).json({
        message:"partner successfully logged in",
        user:{
            _id:foodpartner._id,
            name:foodpartner.name,
            email:foodpartner.email
        }
    });
}

const logoutFoodPartner=async(req,res)=>{
    res.clearCookie("zom_part_token");
    return res.status(200).json({message:"partner successfully logged out"})
}

module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner}