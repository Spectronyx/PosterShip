import Poster from "../Model/poster.model.js";
import asyncHandler from "express-async-handler"


// @desc fetch all the posters
// @router GET /api/poster
export const getPosters = asyncHandler(async (req, res) => {
    const posters = await Poster.find({});
    res.json(posters)

});


export const getPosterById = asyncHandler(async (req, res) => {
    const poster = await Poster.findById(req.params.id);

    if(poster){
        res.json(poster);
    }else{
        res.status(404)
        throw new Error("Poster not found"); 
    }
});
