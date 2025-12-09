import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  email: { type: String, required: 'Email is required' },
  message: { type: String, required: 'Message is required' },
  created: { type: Date, default: Date.now },
});

export default mongoose.model('Contact', ContactSchema);