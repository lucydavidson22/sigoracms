var Sequence = require('../models/sequence');

var maxDocumentId;
var maxContactId;
var maxCommissionId;
var maxTargetId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return console.log("An error occurred!");
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxContactId = sequence.maxContactId;
      maxCommissionId = sequence.maxCommissionId;
      maxTargetId = sequence.maxTargetId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      console.log('get the maxId');
      nextId = maxDocumentId;
      break;
    case 'customers':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    case 'commissions':
      maxCommissionId++;
      updateObject = {maxCommissionId: maxCommissionId};
      nextId = maxCommissionId;
      break;
    case 'targets':
      maxTargetId++;
      updateObject = {maxTargetId: maxTargetId};
      nextId = maxTargetId;
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
