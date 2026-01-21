export const  errorMiddleware = (err,req,res,next)=>{
    const statusCode = res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack : process.env.NODE_ENV === "Production" ? null : err.stack,
    });
}