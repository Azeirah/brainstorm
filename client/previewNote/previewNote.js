Template.previewNote.content = function () {
  return Session.get('content');
};

Template.previewNote.title = function () {
  return Session.get('title');
};

Template.previewNote.tags = function () {
  return Session.get('tags');
};

Template.previewNote.rendered = function () {
  previewNote = this;
};
