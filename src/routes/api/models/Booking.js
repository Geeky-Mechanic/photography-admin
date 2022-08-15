import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date:{
            type: Number,
            required: true,
        },
        address:{
            type: Number,
            required: true,
        },
        streetName:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        postalCode:{
            type: String,
            required: true,
        },
        answered: {
            type: Boolean,
            required: true,
        }
    },
);

export default  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);