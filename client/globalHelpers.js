UI.registerHelper('session', function(key) {
    return Session.get(key);
});

UI.registerHelper('is', function (value1, value2) {
    return value1 === value2;
});