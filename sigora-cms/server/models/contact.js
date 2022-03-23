const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true  },
   kilowatts: { type: String, required: true  },
   dateclosed: { type: String, required: true },
   costtocustomer: { type: String, required: true },
   commission: { type: String, required: true },
   group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }]
});

module.exports = mongoose.model('Customer', contactSchema);
