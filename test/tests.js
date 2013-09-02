var assert = require('assert');
var viewable = require('viewable');

describe('Viewable', function () {
    beforeEach(function () {
        this.view = viewable();
        this.view.el = document.createElement('div');
    });

    describe('.find', function () {
        it('should find child element', function () {
            var foo = document.createElement('div');
            foo.className = 'foo';

            this.view.append(foo);
            assert(this.view.find('.foo'));
        });
    });

    describe('.findAll', function () {
        it('should find multiple child elements', function () {
            var foo = document.createElement('div');
            foo.className = 'foo';
            this.view.append(foo);

            var foo = document.createElement('div');
            foo.className = 'foo';
            this.view.append(foo);

            assert(this.view.findAll('.foo').length === 2);
        });
    });

    describe('.bind', function () {
        it('binds event handler', function () {
            var clicked = false;

            this.view.bind('click', function () {
                clicked = true;
            });

            this.view.el.dispatchEvent(new MouseEvent('click'));
            assert(clicked);
        });
    });

    describe('.unbind', function () {
        it('unbinds event handler', function () {
            var clicked = false;

            this.view.bind('click', function () {
                clicked = true;
            });

            this.view.unbind();
            this.view.el.dispatchEvent(new MouseEvent('click'));
            assert(clicked === false);
        });
    });

    describe('.remove', function () {
        it('unbinds events', function () {
            var clicked = false;

            this.view.bind('click', function () {
                clicked = true;
            });

            this.view.remove();
            this.view.el.dispatchEvent(new MouseEvent('click'));
            assert(clicked === false);
        });

        it('removes element from DOM', function () {
            document.body.appendChild(this.view.el);
            this.view.remove();
            assert(this.view.el.parentNode === null);
        });
    });

    describe('.register', function () {
        it('registers subview', function () {
            this.view.register(viewable());
            assert(this.view.subviews.length === 1);
        });
    });

    describe('.unregister', function () {
        it('unregisters single subview', function () {
            var subview = viewable();
            this.view.register(subview);
            this.view.unregister(subview);
            assert(this.view.subviews.length === 0);
        });

        it('unregisters all subviews', function () {
            this.view.register(viewable());
            this.view.register(viewable());
            this.view.unregister();
            assert(this.view.subviews.length === 0);
        });
    });

    describe('.destroy', function () {
        it('removes view', function () {
            var removed = false;

            this.view.remove = function () {
                removed = true;
            };

            this.view.destroy();
            assert(removed);
        });

        it('destroys subviews', function () {
            var destroyed = false;

            var subview = viewable();
            subview.destroy = function () {
                destroyed = true;
            };

            this.view.register(subview);
            this.view.destroy();
            assert(destroyed);
        });
    });
});