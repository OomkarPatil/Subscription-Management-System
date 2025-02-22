import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "userName is required"],
        trim: true,
        minLength: 5,
        maxLength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "userEmail is required"],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/,"Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "userPassword is required"],
        minLength: [7, "Password must be at least 7 characters long"],
        match: [
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
            "Password must contain at least one uppercase letter, one number, and one special character"
        ]
    }
},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;