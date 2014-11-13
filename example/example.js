/**
 * Module dependencies
 */

var fillParent = require('../');

var container = document.querySelector('.container');

container.addEventListener('click', function(event) {
  var el = event.target;
  
  if (el.classList.contains('is-selected')) {
    el.setAttribute('style', '');
  } else {
    fillParent(el, container, {x: 100, y: 100});
  }

  el.classList.toggle('is-selected');
});
