(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Module dependencies
 */

var fillParent = require('../');
var container = document.querySelector('.content');

container.addEventListener('click', function(event) {
  var el = event.target;

  if (!event.target.classList.contains('childElement')) {
    return;
  }

  if (el.classList.contains('is-selected')) {
    el.setAttribute('style', '');
  } else {
    fillParent(el, el.parentElement, {x: 40, y: 40});
  }

  el.classList.toggle('is-selected');
});
},{"../":2}],2:[function(require,module,exports){
/**
 * Module dependencies
 */

var prefixed = require('prefixed');
var getElementCenter = require('get-element-center');

/**
 * Expose `fillParent`
 */

module.exports = fillParent;

/**
 * Center and scale an `el` to fill its `parent` element. 
 * Aspect ratio is maintained.
 *
 * @param {Object} el
 * @param {Object} parent
 * @param {Object} [padding]
 *   @param {Number} x
 *   @param {Number} y
 */

function fillParent(el, parent, padding) {
  padding = padding || {};
  padding.x = padding.x || 0;
  padding.y = padding.y || 0;

  var scale = calculateScale(el, parent, padding);
  var distanceFromCenter = getDistanceFromCenter(el, parent);

  var transform = 'translateX(' + distanceFromCenter.x + 'px) ' + 
                  'translateY(' + distanceFromCenter.y +  'px) ' +
                  'scale(' + scale + ')';
                  
  prefixed(el.style, 'transform', transform);
}

/**
 * Calculate the scale of an `el` needed to fill `parent`
 *
 * @param {Object} el
 * @param {Object} parent
 * @param {Object} padding
 * @returns Number
 */

function calculateScale(el, parent, padding) {
  var elDimensions = el.getBoundingClientRect();
  var parentDimensions = parent.getBoundingClientRect();

  return Math.min(
    (parentDimensions.height - padding.y) / elDimensions.height,
    (parentDimensions.width - padding.x) / elDimensions.width
  );
}

/**
 * Return an `el`s distance from the center of its `parent`
 *
 * @param {Object} el
 * @param {Object} parent
 * @returns {Object}
 */

function getDistanceFromCenter(el, parent) {
  var elementCenter = getElementCenter(el);
  var parentCenter = getElementCenter(parent);

  return {
    y: parentCenter.y - elementCenter.y,
    x: parentCenter.x - elementCenter.x
  };
}

},{"get-element-center":3,"prefixed":4}],3:[function(require,module,exports){
/**
 * Expose `getElementCenter`
 */

module.exports = getElementCenter;

/**
 * Get an `element`s center (x,y)
 * @param {Object} element
 * @returns {Object}
 */

function getElementCenter(element) {
  var dimensions = element.getBoundingClientRect();
  var centerYCoord = element.offsetTop + (dimensions.height / 2);
  var centerXCoord = dimensions.left + (dimensions.width / 2);
  return {
    y: centerYCoord,
    x: centerXCoord
  };
}

},{}],4:[function(require,module,exports){
/**
 * Supported prefixes.
 */

var prefixes = [
  '-webkit-', '-moz-', '-o-', '-ms-', ''
];

/**
 * Expose `prefixed`.
 */

module.exports = prefixed;

/**
 * Set a style with all the vendor prefixes.
 *
 * @param {Object} style
 * @param {String} attribute
 * @param {String} value
 */

function prefixed (style, attribute, value) {
  for (var i = 0; i < prefixes.length; i++) {
    style[prefixes[i] + attribute] = value;
  }
};

/**
 * Get a (possibly prefixed) value.
 *
 * @param {Object} style
 * @param {String} attribute
 * @return {String}
 */

prefixed.get = function (style, attribute) {
  for (var i = 0; i < prefixes.length; i++) {
    var value = style[prefixes[i] + attribute];
    if (value && value != '') return value;
  }
  return '';
};


},{}]},{},[1]);
