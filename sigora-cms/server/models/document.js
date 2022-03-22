const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   knocks: { type: Number },
   answers: { type: Number },
   sets: { type: Number },
   totalTime: { type: Number },
   propsRun: { type: Number }
});

module.exports = mongoose.model('Document', documentSchema);
