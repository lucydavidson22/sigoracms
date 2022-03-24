const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxDocumentId: { type: String, required: true},
  maxContactId: { type: String, required: true},
  maxCommissionId: { type: String, required: true},
});

module.exports = mongoose.model('Sequence', sequenceSchema);
