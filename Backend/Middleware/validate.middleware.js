import { valid } from "joi";
import { ApiError } from "../Utils/ApiError";

const validate = (schema)=>(req,res,next)=>{
    // validate the body against the provided schema

    const { error, value } = schema.validate(req.body,{
        aboutEarly: false, // Include all the error, not just found first
        stripUnknown:true,

    });

    if(error){
        //Map through errors to create a readable message
        const errorMessage = error.details
        .map((detail)=>detail.message.replace(/["']/g,""))
        .join(", ");

        throw new ApiError(400, errorMessage);
    }

    // replace the body with sanitized and cleaned value
    req.body = value;
    next();
}

export default validate;