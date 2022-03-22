const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   email: { type: String, required: true },
   phone: { type: String, required: true },
   imageUrl: { type: String, required: true },
  //  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }]
});

module.exports = mongoose.model('Customer', contactSchema);
