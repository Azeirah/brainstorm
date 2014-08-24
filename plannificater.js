if (Meteor.isClient) {
  Template.notes.notes = function () {
    return Notes.find({});
  };

  Template.previewNote.rendered = function () {
    previewNote = this;
  };

  Template.note.selectedNote = function selectedNote () {
      var note = Notes.findOne({_id: Session.get('selectedNote')});
      return note;
  };

  Template.tag.tagNote = function (tag) {
    return Notes.find({tags: tag}).fetch();
  };

  Meteor.subscribe('notes');
}

if (Meteor.isServer) {
  Notes.deny({
    insert: function (userId, doc) {
      return (!doc.title || !doc.tags || !doc.content);
    }
  });

  Notes.allow({
    insert: function (userId, doc) {
      return (doc.title && doc.tags && doc.content);
    }
  });

  Meteor.publish('notes', function () {
    return Notes.find({});
  });
}
