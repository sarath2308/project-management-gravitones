import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  title:{type: String, required: true},
  description: {type: String, required: true},
  projectId: {type: Schema.Types.ObjectId, required: true},
  assignedTo: {type: Schema.Types.ObjectId, required: true},
  status: {type:String, default: "pending"},
  comments:{type: Array,default:[]},
});


export const Task = mongoose.model("Task",schema);