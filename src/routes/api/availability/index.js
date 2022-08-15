import Availability from "../models/Availability.js";
import connect from "../utils/db.js"

export async function GET(event){
    try{
        await connect();

        const hours = await Availability.find({
            day: {
                $gte: new Date().getTime(),
            }
        });

        return {
            status: 200,
            body: hours,
            headers: {
                "Content-Type": "application/json",
            },
        }

    }catch(err){
        return {
            status: 500,
            body: err,
            headers: {
                "Content-Type": "application/json",
            },
        }
    }
};