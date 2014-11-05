Template.boardNavigation.helpers({
    "boards": function () {
        return Boards.find({});
    }
});

Template.boardNavigation.events({
    "submit #newBoard": function (e, t) {
        var $boardName = t.find("#boardName");
        e.preventDefault();
        e.stopPropagation();
        Boards.insert({name: $boardName.value});
        $boardName.value = "";
        return false;
    }
});