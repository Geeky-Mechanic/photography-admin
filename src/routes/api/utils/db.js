import mongoose from 'mongoose';

//use in dev mode
/* import dotenv from 'dotenv';
dotenv.config(); */

export default async function connect () {
    if(mongoose.connection.readyState !== 1){
        await mongoose.connect(process.env.MONGO_URL);
        console.log("reconnecting");
        return;
    } else {
        console.log("reusing connection");
        return;
    }
};