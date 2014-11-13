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
 * Expose `calculateFill`
 */

fillParent.calculateFill = calculateFill;

/**
 * Center an scale an `el` to fill its `parent` element. 
 * Aspect ratio is maintained.
 *
 * @param {Object} el
 * @param {Object} parent
 * @param {Object} padding
 */

function fillParent(el, parent, padding) {
  var fill = calculateFill(el, parent, padding);
  var transform = 'translateX(' + fill.x + 'px) translateY(' + fill.y +  'px) scale(' + fill.scale + ')';
  prefixed(el.style, 'transform', transform);
}

/**
 * Return the properties needed to scale an `el` to fill its `parent` element.
 *
 * @param {Object} el
 * @param {Object} parent
 * @param {Object} padding
 *   @param {Number} [x]
 *   @param {Number} [y]
 * @returns {Object}
 */

function calculateFill(el, parent, padding) {
  var scale = calculateScale(el, parent, padding);
  var distanceFromCenter = getDistanceFromCenter(el, parent);

  return {
    x: distanceFromCenter.x,
    y: distanceFromCenter.y,
    scale: scale
  };
}

/**
 * Calculate the scale of an `el` needed to fill `parent`
 *
 * @param {Object} el
 * @param {Object} parent
 * @param {Object} padding
 *   @param {Number} [x]
 *   @param {Number} [y]
 *
 * @returns Number
 */

function calculateScale(el, parent, padding) {
  padding = padding || {};
  padding.x = padding.x || 0;
  padding.y = padding.y || 0;

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
