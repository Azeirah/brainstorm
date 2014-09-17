if (Meteor.isClient) {
  Template.previewNote.rendered = function () {
    previewNote = this;
  };

  Template.note.selectedNote = function selectedNote () {
      var note = Notes.findOne({_id: Session.get('selectedNote')});
      return note;
  };

  Template.tag.tagNote = function (tag) {
    return Notes.find({tags: {$in: [tag]}}).fetch();
  };

  Meteor.subscribe('notes');
}
