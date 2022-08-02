import {
    connect
} from "../utils/db.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import {
    Decrypt
} from '../utils/encryption';

//use in dev mode
import dotenv from 'dotenv';
dotenv.config();

export async function POST(event) {
    const creds = await event.request.json();
    const username = creds.username;
    const password = creds.password;
    //1- connect to db
    await connect();
    //2- validate login info
    try {
        const user = await User.findOne({
            username,
        });
        if (!user) {
            return {
                status: 403,
                headers:{
                    "Location": "/"
                },
                body: "Access Denied",
            }
        } else {
            const decryptedPassword = Decrypt(user.password, process.env.PASS_SECRET);
            if (decryptedPassword !== password) {
                return {
                    status: 403,
                    body: "Access Denied"
                }
            } else {
                //3- Sign JWT
                const accessToken = jwt.sign({
                        id: user._id,
                    },
                    process.env.JWT_SECRET, {
                        expiresIn: "1h"
                    }
                );
                //4- send back as cookie
                return {
                    status: 200,
                    headers: {
                        "content-type": "application/json",
                        "Set-Cookie": `token=${accessToken}; HttpOnly; Expires=${new Date().getTime() + (60 * 1000)}; Path=/`
                    },
                }
            };
        }
    } catch (err) {
        return{
            status: 500,
            body: err,
        }
    }
}