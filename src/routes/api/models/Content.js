import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    location: {
        type: String,
    },
});

export default  mongoose.models.Content || mongoose.model("Content", contentSchema);