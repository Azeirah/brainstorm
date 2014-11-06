Template.notes.helpers({
    "notes": function (board) {
        var boardId = Boards.findOne({name: board})._id;
        return Notes.find({"board_id": boardId}, {sort: {"date_created": -1}});
    }
});