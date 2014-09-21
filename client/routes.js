Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home',
        layoutTemplate: 'container'
    });

    this.route('tag', {
        path: '/tag/:tag',
        template: 'tag',
        layoutTemplate: 'container',
        data: function () {
            return {
                tag: this.params.tag
            };
        }
    });

    this.route('note', {
        path: '/note/:_id',
        template: 'note',
        layoutTemplate: 'shareNote',
        data: function () {
            return {
                id: this.params._id
            }
        }
    });
});
