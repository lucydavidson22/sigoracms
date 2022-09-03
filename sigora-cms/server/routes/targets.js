const sequenceGenerator = require('./sequenceGenerator');
const Target = require('../models/target');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  Target.find()
  .then(targets => {
    if(!targets){
      return res.status(500).json({
        message: "Targets were not fetched!"
      })
    }
    return res.status(200).json(targets);
  });
});

router.post('/', (req, res, next) => {
  console.log('targets posted?');
  const maxTargetId = sequenceGenerator.nextId("targets");

  const target = new Target({
    id: maxTargetId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    commissGoal: req.body.commissGoal
  });

  target.save()
    .then(createdTarget => {
      res.status(201).json({
        message: 'Target added successfully',
        target: createdTarget
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
  Target.findOne({ id: req.params.id })
    .then(target => {
      target.startDate = req.body.startDate;
      target.endDate = req.body.endDate;
      target.commissGoal = req.body.commissGoal;

      Target.updateOne({ id: req.params.id }, target)
        .then(result => {
          res.status(204).json({
            message: 'Target updated successfully'
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
        message: 'Target not found.',
        error: { target: 'Target not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Target.findOne({ id: req.params.id })
    .then(target => {
      Target.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Target deleted successfully"
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
        message: 'Target not found.',
        error: { target: 'target not found'}
      });
    });
});
