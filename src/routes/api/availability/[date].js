import Availability from "../models/Availability.js";
import connect from "../utils/db.js"

export async function GET(event) {
    try {
        await connect();
        const date = event.params.date;
        const dateParts = date.split("-");
        const year = dateParts[0];
        const month = parseInt(dateParts[1]) - 1;
        const day = dateParts[2];

        const hours = await Availability.find({
            day: new Date(year, month.toString(), day).setUTCHours(4)
        }).select({
            hours: 1,
            _id: 0
        });

        return {
            status: 200,
            body: hours,
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

export async function POST(event) {
    try {
        await connect();

        const date = event.params.date;
        const dateParts = date.split("-");
        const year = dateParts[0];
        const month = parseInt(dateParts[1]) - 1;
        const day = dateParts[2];

        const req = await event.request.json();

        const newAvailability = new Availability({
            day: new Date(year, month.toString(), day).setUTCHours(4),
            hours: req.hours
        });

        const saved = await newAvailability.save();

        return {
            body: saved,
            status: 200,
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

export async function PUT(event) {
    try {
        await connect();

        const date = event.params.date;
        const dateParts = date.split("-");
        const year = dateParts[0];
        const month = parseInt(dateParts[1]) - 1;
        const day = dateParts[2];

        const req = await event.request.json();

        const updatedAvailability = await Availability.findOneAndUpdate({
            day: new Date(year, month.toString(), day).setUTCHours(4),
        }, {
            $push: {
                hours: {
                    $each: req.hours
                }
            }
        },{ new: true });

        return {
            body: updatedAvailability,
            status: 200,
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