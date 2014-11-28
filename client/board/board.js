getCurrentBoardId = function () {
    return Boards.findOne({name: Template.currentData().name})._id;
};

UI.registerHelper('getCurrentBoardname', function () {
    return currentBoardName;
});