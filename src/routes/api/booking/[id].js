import Booking from "../models/Booking.js";
import connect from "../utils/db.js"

export async function GET(event){
    const id = event.params.id;
    try{
        await connect();

        const booking = await Booking.findById(id);

        return {
            status: 200,
            body: booking,
            headers:{
                "Content-Type": "application/json"
            }
        }

    }catch(err){
        return {
            status: 500,
            body: err,
            headers: {
                "Content-type": "application/json"
            }
        }
    }
};