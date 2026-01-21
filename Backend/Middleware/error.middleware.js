export const  errorMiddleware = (err,req,res,next)=>{

    // if it is our own api error ,use its status , otherwise ,use 500;
    let statusCode = err.statusCode || 500;
    let message = err.message;

    res.status(statusCode)
    .json({
        success: false,
        message: message,
        stack : process.env.NODE_ENV === "Production" ? null : err.stack,
    });
}