import mongoose from 'mongoose';

//use in dev mode
import dotenv from 'dotenv';
dotenv.config();

export async function connect () {
await mongoose.connect(process.env.MONGO_URL);
};