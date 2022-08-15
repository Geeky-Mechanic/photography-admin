import connect from "../../utils/db.js";
import Contact from "../../models/Contact.js";

export async function GET(event){
    const age = event.params.age;
    try{
        await connect();

        let truthyValue;
        if(age === "anciens"){
            truthyValue = true;
        } else if(age === "nouveaux"){
            truthyValue = false;
        }

        const messagesCount = await Contact.countDocuments({
            answered: truthyValue,
        });

        return {
            body: messagesCount,
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