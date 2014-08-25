Template.note.events({
    'mouseenter': function(event, t) {
        Session.set('selectedNote', t.data._id);
    }
});
