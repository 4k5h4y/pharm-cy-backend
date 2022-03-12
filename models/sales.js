const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
  customerName: { type: String, require: true },
  drugName: { type: Array, require: true },
  dateTime: { type: Date, default: Date.now, require: true },
  totalPrice: { type: Number, require: true },
  tax: { type: Number, require: true },
  paidAmount: { type: Number, require: true },
  balance: { type: Number, require: true }
})

module.exports = mongoose.model('Sales', salesSchema);
