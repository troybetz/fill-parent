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
