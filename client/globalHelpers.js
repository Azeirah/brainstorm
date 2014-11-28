UI.registerHelper('session', function(input) {
    return Session.get(input);
});

UI.registerHelper('is', function (value1, value2) {
    return value1 === value2;
});