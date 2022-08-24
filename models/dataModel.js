import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    userData: mongoose.Schema.Types.Array
})

const dataModel = mongoose.model("Data", dataSchema, "data");
export default dataModel;