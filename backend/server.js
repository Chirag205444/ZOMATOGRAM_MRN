const app=require('./src/app');
const connectdb=require("./src/db/db");
connectdb()

app.listen(process.env.PORT,()=>{
    console.log('port listening to port 3000');
})