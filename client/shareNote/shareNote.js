Template.shareNote.note = function (id) {
    var note = Notes.findOne({_id: id});
    note.share = true;
    return note;
};