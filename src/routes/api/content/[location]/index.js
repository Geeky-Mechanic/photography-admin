import Content from '../../models/Content.js';
import { connect } from '../../utils/db.js';

export async function GET(event) {
    //verify token
    const location = event.params.location;
    try{
        await connect();
        //query db for content in that location
        const content = await Content.find({
            location: location
        });

        return{
            status: 200,
            body: content,
        }

    }catch(err){
        return{
            status: 500,
            body: err,
        }
    }
};

export async function POST(event) {
    const req = await event.request.json();
    const title = req.title || "";
    const content = req.content || "";
    const image = req.image || "";
    const location = req.location || "";
    try{
        //save new document to DB
        await connect();
        const newContent = new Content({
            title,
            content,
            image,
            location,
        });

        const saved = await newContent.save();

        return {
            status: 200,
            body: saved,
            headers: {
                "Content-Type": "application/json",
            },
        }
    }catch(err){
        return {
            status: 500,
            body: err,
        }
    }
};

