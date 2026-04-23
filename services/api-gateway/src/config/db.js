import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Database is connected");
    }
    catch(err){
        console.log(`Data base is not connected due to : ${err}`);
    }
}

export default connectDB;