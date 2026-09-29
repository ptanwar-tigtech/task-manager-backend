import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();

addFormats(ajv);

export const validate = (schema) => {
    const validatedata = ajv.compile(schema);

    return (req, res, next) => {
        const valid = validatedata(req.body);

        if (!valid) {
            return res.status(400).json({
                message: "validation failed",
                error: validatedata.errors
            });
        }

        next();
    };
};