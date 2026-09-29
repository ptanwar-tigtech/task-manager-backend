import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(
            new AppError("Authorization token is required", 401)
        )
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(
            new AppError("Invalid token format", 401)
        );
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded;

        next();
    } catch (error) {
        next(
            new AppError("invalid or expire token", 401)
        )
    }
}

export default auth;