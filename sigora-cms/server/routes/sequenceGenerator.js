var Sequence = require('../models/sequence');
// const res = require("express/lib/response");

var maxDocumentId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        // return res.status(500).json({
        //   title: 'An error occurred',
        //   error: err
        // });
        return console.log("An error occurred!");
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxContactId = sequence.maxContactId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'dailydata':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      console.log('get the maxId');
      nextId = maxDocumentId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  // Sequence.update({_id: sequenceId}, {$set: updateObject},
  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
