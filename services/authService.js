import bcrypt from "bcrypt";

import db from "../database/models/index.js";

import AppError from "../utils/AppError.js";

import jwt from "jsonwebtoken";

const {User} = db;

export const registerUser = async (userData) => {

    const existingUser = await User.findOne({
        where: {
            email: userData.email
        }
    })

    if (existingUser) {
        throw new AppError(
            "Email already registered",
            409
        );
    }

    const hashedPassword = await bcrypt.hash(
        userData.password,
        10
    );

    const newUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
    })


    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };
};

export const loginUser = async(userData)=>{
    
    const user = await User.findOne({
        where:{
            email: userData.email
        }
    })

    if(!user){
        throw new AppError(
            "invalid email or password",
            401
        );
    }

    const passwordMatch = await bcrypt.compare(
        userData.password,
        user.password
    )

    if(!passwordMatch){
        throw new AppError(
            "invalid password",
            401
        )
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token
    }

}