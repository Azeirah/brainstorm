Template.notes.helpers({
    "notes": function (boardName) {
        var boardId = Boards.findOne({name: boardName})._id;
        return Notes.find({"board_id": boardId}, {sort: {"date_created": -1}});
    }
});