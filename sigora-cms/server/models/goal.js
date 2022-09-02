const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
   id: { type: String, required: true },
   startDate: { type: String },
   endDate: { type: String },
   comGoal: { type: Number }
});

module.exports = mongoose.model('Goal', goalSchema);
