import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  checklist: { type: mongoose.Schema.Types.ObjectId, ref: 'Checklist', required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      answer: mongoose.Schema.Types.Mixed,
      imageUrl: { type: String }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export const Answer= mongoose.model('Answer', answerSchema);
