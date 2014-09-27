var parseTags = function(tagsString) {
    var split = tagsString.toLowerCase().split(',');
    return split.filter(function(val) {
        return val.length > 1;
    });
};

var createNoteObject = function(template) {
    var title = template.find('#note-title').value || "";
    var tags = template.find('#note-tags').value || "";
    var content = template.find('#note-content').value || "";

    return {
        "title": title,
        "tags": parseTags(tags),
        "content": content,
        "date_created": new Date().getTime()
    };
};

var validateNote = function(note) {
    return note.title && note.tags && note.tags.length > 0 && note.content;
};

var updatePreviewNote = function() {
    var that = this;
    return _.debounce(function(event, t) {
        t = t || that;
        var note = createNoteObject(t);
        Object.keys(note).forEach(function (what) {
            Session.set(what, note[what]);
        });
        Session.set("previewNoteUpdated", Math.random());
    }, 350);
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
    Session.set("editingNote", "");
    updatePreviewNote()(null, t);
};

var submitTags = function (tags) {
    _.each(tags, function(tag) {
        if (!Tags.findOne({
            name: tag
        })) Tags.insert({
            name: tag
        });
    });
};

Template.editor.rendered = function () {
    var that = this;
    this.autorun(function () {
        if (Session.get('editingNote')) {
            that.find('#note-tags')   .value = Session.get('tags');
            that.find('#note-content').value = Session.get('content');
            that.find('#note-title')  .value = Session.get('title');
        }
    });
};

Template.editor.events({
    'click #newNoteBtn': function(event, t) {
        var note = createNoteObject(t);
        inputValidationFeedback(t);
        if (validateNote(note)) {
            submitTags(note.tags);
            Notes.insert(note);
            cleanupSubmit(t);
        }
    },
    'click #updateNoteBtn': function (event, t) {
        var note = createNoteObject(t);
        inputValidationFeedback(t);
        if (validateNote(note)) {
            submitTags(note.tags);
            Notes.update({_id: Session.get('editingNote')}, {$set: note});
            cleanupSubmit(t);
        }
    },
    'keyup textarea': updatePreviewNote(),
    'keyup #note-title': updatePreviewNote(),
    'keyup #note-tags': updatePreviewNote(),

});

Template.editor.newNoteMode = function () {
    return Session.equals('noteMode', 'new');
};

Template.editor.updateNoteMode = function () {
    return Session.equals('noteMode', 'update');
};

Template.editor.notify = function () {
    return Session.equals("newNoteNotify", true) ? "animated bounce" : "";
};