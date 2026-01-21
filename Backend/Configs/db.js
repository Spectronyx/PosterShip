import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "PosterShop"
        });
        console.log("MongoDB connection successful");
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // Exit with failure;
    }
}

export default connectDB;