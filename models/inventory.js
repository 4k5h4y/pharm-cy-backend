const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
  drug: { type: String, require: true },
  name: { type: String, require: true },
  quantity: { type: Number, require: true },
  batchId: { type: String, require: true },
  expiryDate: { type: Date, require: true },
  price: { type: Number, require: true },
})

module.exports = mongoose.model('Inventory', inventorySchema);
