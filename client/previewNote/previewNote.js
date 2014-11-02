Template.previewNote.helpers({
    content: function () {
        return Session.get('content');
    },

    title: function () {
        return Session.get('title');
    },

    tags: function () {
        return Session.get('tags');
    }
});
