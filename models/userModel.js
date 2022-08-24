import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userLogin: String,
    userPassword: String
});

const userModel = mongoose.model("User", userSchema)
export default userModel;