"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.to = to;
exports.top = top;
exports.bottom = bottom;

/**
 * Library for handling scrolling functionality
 */
var SCROLL_RATE = 1 / 10;
var FAST_SCROLL_RATE = 1 / 2;
var timer = 0;
var timerFunction = null;

function scroll(target, cb) {
  var fast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // Logrithmic scroll rate (higher scrolls faster)
  var scrollRate = fast ? FAST_SCROLL_RATE : SCROLL_RATE; // Current scroll position

  var current = window.pageYOffset; // Set flag for scroll direction

  var down = current < target; // Set step based on scroll rate

  var step = Math.abs(current - target) * scrollRate + 1; // Set next position based on scroll direction

  var next = down ? current + step : current - step; // Set past flag based on scroll direction

  var isPast = down ? next >= target : next <= target; // Set flag to check if at bottom of window for scrolling down

  var tolerance = 5;
  var atBottom = down ? window.innerHeight + window.pageYOffset + tolerance >= document.body.offsetHeight : false; // Scroll to next position

  window.scrollTo(0, next);

  if (!isPast && !atBottom && timer) {
    window.requestAnimationFrame(function () {
      return scroll(target, cb);
    });
    return;
  }

  if (cb) cb();
}
/**
 * Stop requesting animation frames after running for n seconds
 * This fixes case of scroll function never finishing if called twice before the first finishes
 */


function setTimer() {
  timer = 1;
  timerFunction = setTimeout(function () {
    timer = 0;
  }, 2500);
}
/**
 * Scroll to element specified by id
 * @param {string} anchor - element id
 * @param {int} offset
 * @param {function} cb
 * @return {void}
 */


function to(anchor) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // Get element to scroll
  var el = document.getElementById(anchor); // Get position of element

  var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  clearTimeout(timerFunction);
  setTimer();
  window.requestAnimationFrame(function () {
    return scroll(top, cb);
  }); // Update URL hash

  if (window.history && window.history.pushState) {
    window.history.pushState(window.history.state, null, "#".concat(anchor));
  } else {
    window.location.hash = "#".concat(anchor);
  }
}
/**
 * Scroll to top of element
 * @param {node} element
 * @param {int} offset
 * @param {function} cb
 * @return {void}
 */


function top() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var fast = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // Get top position of element
  var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  clearTimeout(timerFunction);
  setTimer();
  window.requestAnimationFrame(function () {
    return scroll(top, cb, fast);
  });
}
/**
 * Scroll to bottom of element
 * @param {node} element
 * @param {int} offset
 * @param {function} cb
 * @return {void}
 */


function bottom() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // Get bottom position of element
  var bottom = el.getBoundingClientRect().top + el.offsetHeight + window.pageYOffset - offset;
  clearTimeout(timerFunction);
  setTimer();
  window.requestAnimationFrame(function () {
    return scroll(bottom, cb);
  });
}