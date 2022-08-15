import Booking from "../models/Booking.js";
import connect from "../utils/db.js";

export async function GET(event){
    try{
        await connect();

        const allBookings = await Booking.find({});

        return {
            status: 200,
            body: allBookings,
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
}