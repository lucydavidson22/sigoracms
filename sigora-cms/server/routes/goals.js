const sequenceGenerator = require('./sequenceGenerator');
const Goal = require('../models/goal');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  Goal.find()
  .then(goals => {
    if(!goals){
      return res.status(500).json({
        message: "Goals were not fetched!"
      })
    }
    return res.status(200).json(goals);
  });
  console.log("get the goals");
});

router.post('/', (req, res, next) => {
  console.log('goals posted');
  const maxGoalId = sequenceGenerator.nextId("goals");

  const goal = new Goal({
    id: maxGoalId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    comGoal: req.body.comGoal
  });

  console.log('create goal try 1');

  goal.save()
    .then(createdGoal => {
      res.status(201).json({
        message: 'Goal added successfully',
        goal: createdGoal
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
    console.log("create goal try 2");
});

router.put('/:id', (req, res, next) => {
  Goal.findOne({ id: req.params.id })
    .then(goal => {
      goal.startDate = req.body.startDate;
      goal.endDate = req.body.endDate;
      goal.comGoal = req.body.comGoal;

      Goal.updateOne({ id: req.params.id }, goal)
        .then(result => {
          res.status(204).json({
            message: 'Goal updated successfully'
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
        message: 'Goal not found.',
        error: { goal: 'Goal not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Goal.findOne({ id: req.params.id })
    .then(goal => {
      Goal.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Goal deleted successfully"
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
        message: 'Goal not found.',
        error: { goal: 'Goal not found'}
      });
    });
});
