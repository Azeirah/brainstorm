var currentBoardName = "Home";

getCurrentBoardId = function () {
    return Boards.findOne({name: currentBoardName})._id;
};

setCurrentBoardName = function (name) {
    currentBoardName = name;
};

UI.registerHelper('getCurrentBoardname', function () {
    return currentBoardName;
});