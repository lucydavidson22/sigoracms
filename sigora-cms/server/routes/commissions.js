const sequenceGenerator = require('./sequenceGenerator');
const Commission = require('../models/commission');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  Commission.find()
  .then(commissions => {
    if(!commissions){
      return res.status(500).json({
        message: "Commissions were not fetched!"
      })
    }
    return res.status(200).json(commissions);
  });
});

router.post('/', (req, res, next) => {
  console.log('commissions posted?');
  const maxCommissionId = sequenceGenerator.nextId("commissions");

  const commission = new Commission({
    id: maxCommissionId,
    systemSize: req.body.systemSize,
    totalCustomerCost: req.body.totalCustomerCost,
    dealerFee: req.body.dealerFee,
    adders: req.body.adders,
    commissionEarned: req.body.commissionEarned
  });

  commission.save()
    .then(createdCommission => {
      res.status(201).json({
        message: 'Commission added successfully',
        commission: createdCommission
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
  Commission.findOne({ id: req.params.id })
    .then(commission => {
      commission.systemSize= req.body.systemSize,
      commission.totalCustomerCost = req.body.totalCustomerCost,
      commission.dealerFee = req.body.dealerFee,
      commission.adders = req.body.adders

      Commission.updateOne({ id: req.params.id }, commission)
        .then(result => {
          res.status(204).json({
            message: 'Commission updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Commission not found.',
        error: { commission: 'Commission not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Commission.findOne({ id: req.params.id })
    .then(commission => {
      Commission.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Commission deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Commission not found.',
        error: { commission: 'Commission not found'}
      });
    });
});
