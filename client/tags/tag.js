Template.tag.tagNote = function (tag) {
  return Notes.find({tags: {$in: [tag]}}).fetch();
};
