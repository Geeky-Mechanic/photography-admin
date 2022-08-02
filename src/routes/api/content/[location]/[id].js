import Content from '../../models/Content.js';
import { connect } from '../../utils/db.js';

//get specific content by id
export async function GET(event){
    // add token validation
    try{
        await connect();
        const id = event.params.id;
        const data = await Content.findById(id);

        return{
            status: 200,
            body: data,
            headers: {
                "Content-Type": "application/json",
            },
        }
    }catch(err){
        return{
            status: 500,
            body: err,
        }
    }
};

export async function PUT(event) {
    try{
        await connect();
        const id = event.params.id;
        const req = await event.request.json();
        //update the fields in db without changing the location
        const updatedContent = await Content.findByIdAndUpdate(id, {
            title: req.title,
            content: req.content,
            image: req.image
        }, {
            new: true,
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
}

export async function DELETE(event){
    const id = event.params.id;
    try{
    //delete entry from db
    await connect();
    const deleted = await Content.findByIdAndDelete(id);
    return {
        status: 200,
        body: deleted,
    }
    }catch(err){
        return {
            status: 500,
            body: err
        }
    }
}