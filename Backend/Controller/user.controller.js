import expressAsyncHandler from "express-async-handler";
import User from "../Model/user.model.js";
import generateToken from "../Utils/generateToken.util.js";


// @desc Authorise user and get the token
// @route POST /api/user/login

export const authUser = expressAsyncHandler ( async (req,res)=>{
    const {email, password} = req.body;
    console.log(email, password)

    const user = await User.findOne({email});
    console.log('Is matchPassword a function?', typeof user.matchPassword);

    if(user && (await user.matchPassword(password))){
        res.status(201)
        .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        }).statusMessage("successfully fetched the user");
    }else{
        res.status(401)
        throw new Error("Invalid Email or password");
    }
}
);

export const registerUser = expressAsyncHandler(async(req,res)=>{
    const {email, name, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //This creates the user and triggers the pre-hook to hash and save the password
    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        res.status(200)
        .json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    };

});


