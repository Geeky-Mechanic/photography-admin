import { connect } from "../../utils/db.js";
import Contact from "../../models/Contact.js";

export async function GET(event){
    const age = event.params.age;
    let truthyValue;
    if(age === "anciens"){
        truthyValue = true;
    } else if(age === "nouveaux"){
        truthyValue = false;
    }
    try{
        await connect();

        const skipNum = event.request.headers.get("skip") || 0;
        const messages = await Contact.find({
            answered: truthyValue,
        }).sort({
            date: 1
        }).limit(10)
        .skip(skipNum)
        .select({
            name: 1,
            lName: 1,
            date: 1,
            subj: 1
        });

        return {
            body: messages,
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