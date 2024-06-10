import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checklist: { type: mongoose.Schema.Types.ObjectId, ref: 'Checklist' },
  status: { type: String, enum: ['created', 'in_progress', 'completed'], default: 'created' },
  createdAt: { type: Date, default: Date.now }
});

export const Order= mongoose.model('Order', orderSchema);
