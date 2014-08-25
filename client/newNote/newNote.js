var parseTags = function(tagsString) {
    var split = tagsString.replace(/ /g, '').toLowerCase().split(',');
    return split.filter(function(val) {
        return val.length > 1;
    });
};

var createNoteObject = function(template) {
    var title = template.find('#note-title').value || "";
    var tags = template.find('#note-tags').value || "";
    var content = template.find('#note-content').value || "";

    return createNoteObject.note(title, tags, content);
};

createNoteObject.note = function(title, tags, content) {
    return {
        title: title,
        tags: parseTags(tags),
        content: content
    }
};

var validateNote = function(note) {
    return note.title && note.tags && note.tags.length > 0 && note.content;
};

var updatePreviewNote = function() {
    var that = this;
    return function(event, t) {
        t = t || that;
        var note = createNoteObject(t);
        for (var what in note) {
            Session.set(what, note[what]);
        }
        Session.set(what, note[what]);
    };
};

var inputValidationFeedback = function(t) {
    var title = t.find('#note-title');
    var tags = t.find('#note-tags');
    var content = t.find('#note-content');

    if (!title.value) {
        $(title).addClass('required');
    } else {
        $(title).removeClass('required');
    }
    if (!tags.value) {
        $(tags).addClass('required');
    } else {
        $(tags).removeClass('required');
    }
    if (!content.value) {
        $(content).addClass('required');
    } else {
        $(content).removeClass('required');
    }
};

var cleanupSubmit = function(t) {
    var title = t.find('#note-title');
    var tags = t.find('#note-tags');
    var content = t.find('#note-content');
    $(title).removeClass('required');
    $(tags).removeClass('required');
    $(content).removeClass('required');
    title.value = tags.value = content.value = '';
    Session.set("content", "");
    Session.set("title", "");
    Session.set("tags", "");
    updatePreviewNote();
};

Template.newNote.rendered = updatePreviewNote();

Template.newNote.events({
    'click #newNoteBtn': function(event, t) {
        var note = createNoteObject(t);
        inputValidationFeedback(t);
        if (validateNote(note)) {
            // insert tags into the db if they don't exist yet
            _.each(note.tags, function(tag) {
                if (!Tags.findOne({
                    name: tag
                })) Tags.insert({
                    name: tag
                });
            });
            Notes.insert(note);
            cleanupSubmit(t);
        }
    },
    'keyup textarea': updatePreviewNote(),
    'keyup #note-title': updatePreviewNote(),
    'keyup #note-tags': updatePreviewNote()
});
