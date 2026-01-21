import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const posterSchema = new Schema({

    name: {
        type: String,
        required: [true, "Enter the poster name"],
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: [true, "Plese add the poster image"]
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }

},
    {
        timestamps: true
    }
);


const Poster = mongoose.model("Poster",posterSchema);

export default Poster;