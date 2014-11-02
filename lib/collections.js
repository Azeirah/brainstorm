Notes = new Meteor.Collection('notes');
Tags = new Meteor.Collection('tags');

NotesSchema = new SimpleSchema({
    title: {
        type: String,
        label: 'title',
        max: 120
    },
    tags: {
        type: [String],
        label: 'tags',
        min: 2,
        max: 30,
        minCount: 1,
        maxCount: 50
    },
    content: {
        type: String,
        label: 'content',
        max: 10000
    }
});

Notes.attachSchema(NotesSchema);

var Tag = function (name, child) {
    Tags.insert({
        name: name,
        children: [child]
    });
};
