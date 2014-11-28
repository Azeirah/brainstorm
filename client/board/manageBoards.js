Template.manageBoards.helpers({
    boards: function () {
        return Boards.find({});
    },
    confirmBoardRemoval: function () {
        return function (collection, id) {
            var doc = Boards.findOne({_id: id});
            if (window.confirm("Really remove " + doc.name + "? Your posts won't be permanently removed, but there is currently NO WAY to access them after deleting the board.")) {
                this.remove();
            }
        }
    }
});