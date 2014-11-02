Template.tag.helpers({
    "tagNote": function (tag) {
      return Notes.find({tags: {$in: [tag]}}).fetch();
    }
});
