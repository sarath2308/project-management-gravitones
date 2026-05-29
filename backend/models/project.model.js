import mongoose, { Schema, Types } from "mongoose";


const schema = new mongoose.Schema({
    name:{type: String,required: true },
    description:{type: String, required: true},
    owner:{type: Schema.Types.ObjectId, required: true},
    members:{type: Array, default:[]},
    createdAt:{type: Date},

},{timestamps: true});


export const Project = mongoose.model("Project",schema);