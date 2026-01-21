/**
 * A higher order function takes a request handler
 * that any error caused and passed to the next();
 */

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err));
    };
};

export {asyncHandler}