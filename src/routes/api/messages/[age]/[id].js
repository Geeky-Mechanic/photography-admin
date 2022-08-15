import connect from "../../utils/db.js";
import Contact from "../../models/Contact.js";

export async function GET(event){
    const id = event.params.id;
    try{
        await connect();
        
        const message = await Contact.findById(id);
        return {
            body: message,
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        };

    }catch(err){
        return {
            body: err,
            status: 500,
        };
    }
};

// verifiy if this works as intended
export async function PUT(event){
    const id = event.params.id;
    const req = await event.request.json();
    try{
        await connect();
        
        const message = await Contact.findByIdAndUpdate(id, req);
        return {
            body: message,
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        };

    }catch(err){
        return {
            body: err,
            status: 500,
        };
    }
};