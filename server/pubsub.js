Meteor.publish('notes', function () {
  return Notes.find({}, {sort: {"date_created": -1}});
});
