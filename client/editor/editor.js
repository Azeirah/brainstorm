if ( typeof String.prototype.trim !== 'function' ) {
    // detect native implementation
    String.prototype.trim = function () {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

var parseTags = function(tagsString) {
    // all tags will be lowercase, spaces in the front and at the end will be removed, tags that are shorter than 2 characters
    // will be removed.
    // ["  JavaScript   ", " hiThere", "spaces are allowed"] => ["javascript", "hithere", "spaces are allowed"]
    var split = tagsString.toLowerCase().split(',');
    return split.map(function(val) {
        return val.trim();
    }).filter(function(val) {
        return val.length > 1;
    });
};

var createNoteObject = function(template) {
    // create an object that is to be inserted into the database, it's created from a template
    return {
        "title":        template.find('#note-title').value || "",
        "tags":         parseTags( template.find('#note-tags').value || "" ),
        "content":      template.find('#note-content').value || "",
        "date_created": new Date().getTime(),
        "board_id":     Session.get("boardId")
    };
};

var validateNote = function(note) {
    return note.title && note.tags && note.tags.length > 0 && note.content;
};

var updatePreviewNote = function() {
    var that = this;
    return _.throttle(function(event, t) {
        t = t || that;
        var note = createNoteObject(t);
        ["title", "tags", "content"].forEach(function (key) {
            Session.set( key, note[key] );
        });
        // This is a bit of a hack, Session.get("previewNoteUpdated") will only update when the value changes
        // what I really wanted to do here is send a signal, I don't want to preserve data, so I'm actually abusing the Session.
        Session.set( "previewNoteUpdated", Math.random() );
    }, 70);
};

var inputValidationFeedback = function(t) {
    var validateNode = function(node) {
        if ( !node.value ) {
            $(node).addClass('required');
        } else {
            $(node).removeClass('required');
        }
    };
    [t.find('#note-title'), t.find('#note-tags'), t.find('#note-content')].forEach(validateNode);
};

var cleanupSubmit = function(t) {
    var clean = function (node) {
        $(node).removeClass('required');
        node.value = '';
    };

    [t.find('#note-title'), t.find('#note-tags'), t.find('#note-content')].forEach(clean);

    ["content", "title", "tags", "editingNote"].forEach(function (key) {
        Session.set(key, "");
    });
};

var submitTags = function(tags) {
    tags.forEach(function (tag) {
        if ( !Tags.findOne({name: tag}) ) {
            Tags.insert({name: tag});
        }
    });
};

Template.editor.rendered = function() {
    var that = this;
    this.autorun(function() {
        if ( Session.get('editingNote') ) {
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
        if ( validateNote(note) ) {
            submitTags(note.tags);
            Notes.insert(note);
            cleanupSubmit(t);
        }
    },
    'click #updateNoteBtn': function(event, t) {
        var note = createNoteObject(t);
        inputValidationFeedback(t);
        if ( validateNote(note) ) {
            submitTags(note.tags);
            Notes.update( {_id: Session.get('editingNote')}, {$set: note} );
            cleanupSubmit(t);
            Session.set("noteMode", "new");
        }
    },
    'keyup textarea':    updatePreviewNote(),
    'keyup #note-title': updatePreviewNote(),
    'keyup #note-tags':  updatePreviewNote(),
});

Template.editor.helpers({
    "newNoteMode": function() {
        return Session.equals( 'noteMode', 'new' );
    },

    "updateNoteMode": function() {
        return Session.equals( 'noteMode', 'update' );
    },

    "notify": function() {
        return Session.equals( "newNoteNotify", true ) ? "animated bounce" : "";
    }
});
