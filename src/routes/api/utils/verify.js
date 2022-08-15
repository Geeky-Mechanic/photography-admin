import jwt from 'jsonwebtoken' ;
//use in dev mode
/* import dotenv from 'dotenv';
dotenv.config(); */

export function verifyToken (token) {  
        return jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
            if(err){
                return false;
            }else{
                return true;
            }
        });
};