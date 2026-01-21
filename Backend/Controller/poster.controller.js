import Poster from "../Model/poster.model.js";
import asyncHandler from "express-async-handler"
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";


// @desc fetch all the posters
// @router GET /api/poster
export const getPosters = asyncHandler(async (req, res) => {
    const posters = await Poster.find({});

    if(!posters){
        throw new ApiError(404, "cannot find the posters");
    }
    // res.json(posters)
    new ApiResponse(200,posters);

});


export const getPosterById = asyncHandler(async (req, res) => {
    const poster = await Poster.findById(req.params.id);

    if(poster){
        // res.json(poster);
        new ApiResponse(200,poster)

    }else{
        // res.status(404)
        // throw new Error("Poster not found"); 
        throw new ApiError("cannot find the poster searching for");
    }
});
