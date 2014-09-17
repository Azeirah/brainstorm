Notes.deny({
  insert: function (userId, doc) {
    return (!doc.title || !doc.tags || !doc.content);
  }
});

Notes.allow({
  insert: function (userId, doc) {
    return (doc.title && doc.tags && doc.content && doc.date_created);
  }
});
