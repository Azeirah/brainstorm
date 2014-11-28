Template.navigation.helpers({
    "links": function () {
        var manageBoards = {
            name: "Manage boards",
            url: "/manageBoards"
        };
        var boards = Boards.find({}).fetch().map(function (board) {
            board.url = "/board/" + board.name;
            return board;
        });
        var links = boards.concat(manageBoards);
        return links;
    }
});

Template.navigation.events({
    "submit #newBoard": function (e, t) {
        var $boardName = t.find("#boardName");
        Boards.insert({name: $boardName.value});
        $boardName.value = "";
    }
});