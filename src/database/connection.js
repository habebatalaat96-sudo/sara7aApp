import mongoose from "mongoose";

import { env } from "../../config/index.js";

console.log(env.mongoURl);


export const databaseConnection = async()=>{

    await mongoose.connect(env.mongoURl).then (()=>{
        console.log( "connect to mongoose");
        
    }).catch((err)=>{

        console.log(err);
        
    })
        
    
}