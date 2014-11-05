Notes  = new Meteor.Collection('notes');
Tags   = new Meteor.Collection('tags');
Boards = new Meteor.Collection('boards');

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
    },
    date_created: {
        type: Number
    },
    board: {
        type: String,
        min: 4,
        max: 120
    }
});

BoardsSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'name',
        min: 4,
        max: 120
    }
});

Notes.attachSchema(NotesSchema);
Boards.attachSchema(BoardsSchema);
