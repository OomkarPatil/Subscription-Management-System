import mongoose from  "mongoose";
import { DB_URI,NODE_ENV} from "../config/env.js";

if(!DB_URI){
    throw new Error("Please define the MONGO_URI environment variable inside .env.<development/production>.local");
}

const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to Database in ${NODE_ENV} mode`);

    }catch (e) {
        console.error('Error connecting database',e);
        process.exit(1);
    }
}

export default connectToDatabase;