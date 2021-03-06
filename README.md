*This repository is a mirror of the [component](http://component.io) module [scttnlsn/viewable](http://github.com/scttnlsn/viewable). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/scttnlsn-viewable`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
viewable
========

Add view methods to an object.  Expects object to have an element named `el`.

## Install

    component install scttnlsn/viewable

## Usage

Use it directly:

```js
var viewable = require('viewable');
var view = viewable({ el: document.createElement('div') });

view.bind('click', function (e) {
    console.log('clicked!');
});

document.body.appendChild(view.el);
```

Or as a mixin:

```js
function View() {
    this.el = document.createElement('div');
    this.bind('click');
}

viewable(View.prototype);

View.prototype.onclick = function (e) {
    console.log('clicked!');
};
```

## API

### .append(el)

Append the given element as a child of the view element.

### .find(selector)

Find a child element matching the given selector.

### .findAll(selector)

Find multiple child elements matching the given selector.

### .bind(event, fn)

Bind event handler or delegate (see [component/events](https://github.com/component/events)).

### .unbind(event, fn)

Unbind event handler or delegate (see [component/events](https://github.com/component/events)).

### .remove()

Unbind all events and remove view element from the DOM.

### .destroy()

Destroy all subviews and remove view element from the DOM.

### .register(subview)

Register a subview.

### .unregister([subview])

Unregister a subview or all subviews if no subview is given.

## License

MIT