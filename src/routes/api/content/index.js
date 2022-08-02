import Content from '../models/Content.js';
import { connect } from '../utils/db.js'


/* Verify usefulness of this endpoint */
/* maybe give user metrics and info instead like bookings etc and traffic */

export async function GET(event) {
    // add token validation
    try {
        /* const req = await event.request.json();
        console.log(req); */
        await connect();
        //query db for content displayed atm
        const actualContent = await Content.find({});
        return {
            status: 200,
            body: actualContent,
            headers: {
                "Content-Type": "application/json",
            },
        }
    } catch (err) {
        return {
            status: 500,
            body: err,
            headers: {
                "Content-Type": "application/json",
            },
        }
    }
};

export async function PUT(event){
    //add token validation
    
    try{
        await connect();
        const req = await event.request.json();
        const location = req.location;
        //update the fields in db without changing the location
        const updatedContent = await Content.findOneAndUpdate(location, {
            title: req.title,
            content: req.content,
            image: req.image
        });
        return {
            status: 200,
            body: updatedContent,
            headers: {
                "Content-Type": "application/json",
            },
        }
    }catch(err){
        return{
            status: 500,
            body: err,
            headers: {
                "Content-Type": "application/json",
            },
        }
    };
};