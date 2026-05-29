import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
    try{

   let result = await mongoose.connect(process.env.DB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

console.log("database connected")
    }
    catch(err)
    {
        console.error("database not connected")
    }
}


export default connectDB;