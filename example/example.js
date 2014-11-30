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