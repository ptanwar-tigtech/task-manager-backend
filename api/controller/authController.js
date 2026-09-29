import { registerUser, loginUser } from "../../services/authService.js";

export const register = async(req, res, next)=>{
    try{
        const user = await registerUser(req.body);

        res.status(201).json({
            message: "user created successfully",
            user
        })
    }catch(error){
        next(error)
    }
}

export const login = async(req, res, next)=>{
    try{
        const user = await loginUser(req.body);

        res.status(200).json({
            message: "login successfull",
            user
        })
    }catch(error){
        next(error)
    }
}