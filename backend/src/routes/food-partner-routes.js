const express=require('express');
const { authUserMiddleware } = require('../middlewares/middleware');
const router=express.Router();
const {getFoodpartnerById}=require('../controllers/f-pcontroler');

router.get("/:id",authUserMiddleware,getFoodpartnerById);

module.exports=router;