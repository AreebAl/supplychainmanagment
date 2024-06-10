import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [
    {
      type: { type: String, enum: ['boolean', 'dropdown', 'multiple_choice', 'text', 'image'], required: true },
      question: { type: String, required: true },
      options: [String],
      required: { type: Boolean, default: false }
    }
  ],
  images: {
    loading: { type: String }, // URL to the image at the time of loading
    unloading: { type: String } // URL to the image at the time of unloading
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  createdAt: { type: Date, default: Date.now }
});

export const Checklist = mongoose.model('Checklist', checklistSchema);
