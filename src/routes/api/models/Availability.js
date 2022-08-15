import mongoose from 'mongoose';

const DateSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: true,
        },
        hours: {
            type: Array,
            default: [],
            required: true,
        }
    }
);

export default  mongoose.models.Availabilities || mongoose.model("Availabilities", DateSchema);