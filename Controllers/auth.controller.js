import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        // Logic to create new user
        const { name, email, password } = req.body;

        //check if user alreay exists
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            const error = new Error('User already exist');
            error.statusCode = 409;
            throw error;
        }

        //if it does not exist, will Hash the password (SECURING IT)
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{ name, email, password: hashPassword }], { session });

        const token = jwt.sign({ userId:newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User successfully created',
            data:{
                token,
                user: newUsers[0],
            }
        })
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ email });

        //if user does not exist
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        //if it does exist will validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        //if it not valid
        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        //if it is valid, will generate new token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: 'User successfully Signed in',
            data:{
                token,
                user,
            }
        });

    }catch(error){
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    //implementing Sign-Out logic
}