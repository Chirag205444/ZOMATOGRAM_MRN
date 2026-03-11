require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
const cp=require('cookie-parser');

app.use(cp());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const authRoute=require('./routes/authroutes');
const foodRoute=require('./routes/foodroutes');

app.use("/api/auth",authRoute);
app.use("/api/food",foodRoute);

module.exports=app;