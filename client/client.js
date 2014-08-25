Meteor.startup(function () {
    Session.setDefault("noteMode", "new");
    Session.setDefault("editingNote", "");
    Session.setDefault("newNoteNotify", false);
});