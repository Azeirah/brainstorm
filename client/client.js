Meteor.startup(function () {
    Session.setDefault( "noteMode", "new" );
    Session.setDefault( "editingNote", "" );
    Session.setDefault( "newNoteNotify", false );
});

Tracker.autorun(function () {
    if ( Session.get( "content" ) || Session.get( "editingNote" ) ) {
        window.onbeforeunload = function () {
            return "You haven't finished writing your note, are you sure you want to leave?";
        };
    } else {
        window.onbeforeunload = Function.prototype;
    }
});