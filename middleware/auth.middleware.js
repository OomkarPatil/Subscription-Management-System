import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req,res, next )=> {
    try{
        let token;

        //check if there is token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        //check if there is no token
        if(!token) res.status(401).json({ message: 'Unauthorized' });

        //verifying the token
        const decoded = jwt.verify(token, JWT_SECRET);

        //check if user still exist
        const user = await User.findById(decoded.userId);

        //if it does not exist
        if(!user) res.status(401).json({ message: 'Unauthorized' });

        //exist
        req.user = user;
        next();
    }catch(error){
        res.status(401).json({
            message:"Unauthorized",
            error: error.message
        })
    }
}

export default authorize;