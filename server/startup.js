Meteor.startup(function () {
    if (Boards.findOne({name: "Home"}) === undefined) {
        Boards.insert({name: "Home"});
    }
});