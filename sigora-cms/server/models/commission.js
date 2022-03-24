const mongoose = require('mongoose');

const commissionSchema = mongoose.Schema({
   id: { type: String, required: true },
   systemSize: { type: Number },
   totalCustomerCost: { type: Number },
   dealerFee: { type: Number },
   adders: { type: Number },
   commissionEarned: { type: Number }
});

module.exports = mongoose.model('Commission', commissionSchema);
