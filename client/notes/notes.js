Template.notes.helpers({
    "notes": function () {
        return Notes.find({}, {sort: {"date_created": -1}});
    }
});