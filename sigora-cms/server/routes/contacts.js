const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  Contact.find()
  .then(contacts => {
    if(!contacts){
      return res.status(500).json({
        message: "Customers were not fetched!"
      })
    }
    return res.status(200).json(contacts);
  });
});

router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("customers");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    kilowatts: req.body.kilowatts,
    dateclosed: req.body.dateclosed,
    costtocustomer: req.body.costtocustomer,
    commission: req.body.commission,
    group: req.body.group
  });

  console.log('create customer try 3');

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Customer added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
    console.log('create customer try 4');
});

router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      contact.name = req.body.name;
      contact.kilowatts = req.body.kilowatts;
      contact.dateclosed = req.body.dateclosed;
      contact.costtocustomer = req.body.costtocustomer;
      contact.commission = req.body.commission;
      contact.group = req.body.group;

      Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Customer updated successfully'
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
        message: 'Customer not found.',
        error: { contact: 'Customer not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Customer deleted successfully"
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
        message: 'Customer not found.',
        error: { contact: 'Customer not found'}
      });
    });
});
