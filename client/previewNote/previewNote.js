Template.previewNote.content = function () {
    return Session.get('content');
};

Template.previewNote.title = function () {
    return Session.get('title');
};

Template.previewNote.tags = function () {
    return Session.get('tags');
};

Template.previewNote.rendered = function () {
    previewNote = this;
    var rerenderHLJS = function () {
        var codes = previewNote.findAll("pre>code");
        for (var i = 0; i < codes.length; i++) {
            hljs.highlightBlock(codes[i]);
        }
    };
    Tracker.autorun(function () {
        // rerun syntax highlighting after the debounced text input
        Session.get("content");
        rerenderHLJS();
    });
};