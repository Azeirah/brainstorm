Template.notes.helpers({
    "notes": function (board) {
        return Notes.find({"board": board}, {sort: {"date_created": -1}});
    }
});