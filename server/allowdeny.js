Notes.deny({
  insert: function (userId, doc) {
    return (!doc.title || !doc.tags || !doc.content);
  }
});

var denyHome = function (userId, doc) {
    return doc.name === "Home";
};

Boards.deny({
    insert: denyHome,
    update: denyHome,
    remove: denyHome
});