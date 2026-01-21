import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        }

    },
    {
        timestamps: true,
    }
);

//match the user entered password to the saved original password

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

//Encypt password before saving

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const encyptedpass = await bcrypt.hash(this.password, salt);
    this.password = encyptedpass;


});

const User = mongoose.model("User",userSchema);
export default User;