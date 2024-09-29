import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  potentialProducts: [{ type: String }],
  notes: [{
    content: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  potentialLevel: { type: Number, min: 1, max: 5 }
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
