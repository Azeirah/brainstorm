Template.manageBoards.helpers({
    boards: function () {
        return Boards.find({});
    },
    confirmBoardRemoval: function () {
        return function (collection, id) {
            var doc = Boards.findOne({_id: id});
            if (window.confirm("Really remove " + doc.name + "? Your posts will not be removed, but there is currently no way to access them after deleting the board.")) {
                this.remove();
            };
        }
    }
});