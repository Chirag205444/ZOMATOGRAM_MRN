const mongoose=require('mongoose');

function connectdb() {
mongoose.connect(`${process.env.DB_CONNECTION}/matodb`).then(()=>{
    console.log("Mongodb connected succefully");
}).catch((err)=>{
    console.log(err)
})}

module.exports=connectdb