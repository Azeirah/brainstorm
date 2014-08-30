Template.note.events({
    'mouseenter click': function(event, t) {
        Session.set('selectedNote', t.data._id);
    },
    'click .editNote': function (event, t) {
        Session.set('title', t.data.title);
        Session.set('content', t.data.content);
        Session.set('tags', t.data.tags);
        Session.set('noteMode', 'update');
        Session.set('editingNote', t.data._id);
        // ensures that the animations triggered by these session variables
        // get reset and rerun.
        Session.set('newNoteNotify', false);
        Meteor.setTimeout(function () {
            Session.set('newNoteNotify', true);
        }, 20);
    },
    'click .deleteNote': function (event, t) {
        if (window.confirm("Are you sure you want to delete this note?")) {
            Notes.remove(this._id);
        }
    }
});

Template.note.updatingNote = function () {
    return Session.equals('editingNote', this._id);
};
