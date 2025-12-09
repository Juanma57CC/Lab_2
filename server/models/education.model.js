import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  school: { type: String, required: 'School is required' },
  degree: { type: String, required: 'Degree is required' },
  field: { type: String },
  startYear: { type: String, required: 'Start year is required' },
  endYear: { type: String },
  description: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model('Education', EducationSchema);