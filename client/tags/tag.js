Template.tag.helpers({
    "tagNote": function (tag) {
       var notes = Notes.find({tags: {$in: [tag]}}).fetch();
           notes.forEach(function (note) {
           note.tag = true;
       });
       return notes;
    }
});

