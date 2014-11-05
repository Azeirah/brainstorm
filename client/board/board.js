var currentBoard;

getCurrentBoard = function () {
    return currentBoard ? currentBoard : "Home";
};

Template.board.rendered = function () {
    currentBoard = Template.instance().data.board;
};