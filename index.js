var bind = require('bind');
var each = require('each');
var events = require('events');

module.exports = function (obj) {
    obj || (obj = {});

    obj.append = function (el) {
        this.el.appendChild(el);
    };

    obj.find = function (selector) {
        return this.el.querySelector(selector);
    };

    obj.bind = function (event, fn) {
        this.bindings || (this.bindings = events(this.el, this));
        this.bindings.bind(event, fn);
    };

    obj.unbind = function (event, fn) {
        this.bindings || (this.bindings = events(this.el, this));
        this.bindings.unbind.apply(this.bindings, arguments);
    };

    obj.remove = function () {
        this.unbind();
        var parent = this.el.parentNode;
        if (parent) parent.removeChild(this.el);
    };

    obj.destroy = function () {
        each(this.subviews, function (subview) {
            subview.destroy();
        });

        this.remove();
    };

    obj.register = function (subview) {
        this.subviews || (this.subviews = []);
        if (this.subviews.indexOf(subview) !== -1) return;
        this.subviews.push(subview);
    };

    obj.unregister = function (subview) {
        this.subviews || (this.subviews = []);

        if (subview) {
            var index = this.subviews.indexOf(subview);
            if (index === -1) return;
            this.subviews.splice(index, 1);
        } else {
            this.subviews = [];
        }
    };

    return obj;
};