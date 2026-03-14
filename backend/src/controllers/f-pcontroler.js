const foodPartnerModel=require('../models/foodpartnerModel')

const getFoodpartnerById=async(req,res)=>{
    const foodPartnerId=req.params.id;

    const foodPartner=await foodPartnerModel.findById(foodPartnerId);
    if(!foodPartner){
        return res.status(404).json({message:"food partner not found"})
    }   

    res.status(200).json({
        foodPartner
    })
}

module.exports={getFoodpartnerById}