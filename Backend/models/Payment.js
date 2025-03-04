const mongoose = require('mongoose');

//schema
const paymentSchema = new mongoose.Schema({
  tenantName: { type: String, required: true },
  property: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  upiId: { type: String },
  transactionId: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);