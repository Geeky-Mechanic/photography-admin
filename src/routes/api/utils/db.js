import mongoose from 'mongoose';

//use in dev mode
import dotenv from 'dotenv';
dotenv.config();

export async function connect () {
console.log(mongoose.connection.readyState);
await mongoose.connect(process.env.MONGO_URL);
console.log(mongoose.connection.readyState);

};