const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    foodpartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FoodPartner",
    }
})

module.exports=mongoose.model("Food", foodSchema);