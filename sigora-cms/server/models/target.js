const mongoose = require('mongoose');

const targetSchema = mongoose.Schema({
   id: { type: String, required: true },
   startDate: { type: String },
   endDate: { type: String },
   commissGoal: { type: Number }
});

module.exports = mongoose.model('Target', targetSchema);
