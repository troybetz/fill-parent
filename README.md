# fill-parent

Center and scale an element to fill its parent


## Installation

```
$ npm install module-boilerplate
```

## Usage
Passing an element and its parent to `fillParent` will scale and center it.

`calculateStyle` returns the values used in `fillParent` allowing you to scale it manually.


```js
var fillParent = require('fill-parent');
var calculateStyle = fillParent.calculateStyle;

fillParent(el, parent, padding); // scales el

calculateStyle(el, parent, padding); // returns values object needed to scale el
```

# License

  MIT
