const foodPartnerModel=require('../models/foodpartnerModel')
const foodItemModel=require('../models/foodModel')

const getFoodpartnerById=async(req,res)=>{
    try {
        const foodPartnerId=req.params.id;

        const foodPartner=await foodPartnerModel.findById(foodPartnerId);
        const foodItems=await foodItemModel.find({foodpartner:foodPartnerId});
        if(!foodPartner){
            return res.status(404).json({message:"food partner not found"})
        }   

        res.status(200).json({
            foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItems
        }
        })
    } catch (error) {
        console.error("Error fetching food partner:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports={getFoodpartnerById}