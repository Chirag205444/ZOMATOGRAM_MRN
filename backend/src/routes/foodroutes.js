const express=require('express');
const router=express.Router();
const {createFood,getFoodItems}=require('../controllers/foodpcontroler');
const {authfoodpartnerMiddleware,authUserMiddleware}=require('../middlewares/middleware');
const multer=require('multer');

const upload=multer({
    storage:multer.memoryStorage()
})

router.post('/',authfoodpartnerMiddleware,upload.single("video"),createFood);
router.get('/',authUserMiddleware,getFoodItems);


module.exports=router;