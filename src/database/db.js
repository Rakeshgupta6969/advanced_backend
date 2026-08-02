const mongoose = require("mongoose");
require("dotenv").config();


async function connectDB(){
   await mongoose.connect(process.env.MONGO_URL)
   .then(() =>{
    console.log("mongoDB is connected successfully");
   })
   .catch(error =>{
    console.log("error connecting to the database",error);
    process.exit(1);
   })
}
module.exports  = connectDB;