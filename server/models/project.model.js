import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  image: {
    type: String,
    trim: true, // e.g. "/project1.jpg" or a full URL
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project", ProjectSchema);