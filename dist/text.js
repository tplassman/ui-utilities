"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.balance = balance;

/**
 * Function balance
 * @param {Element} container - DOM Element to search inside for elements to balance
 * @param {selector} balanceHandle - CSS selector applied to elements to be balanced
 *
 * This function will balance lines of text such that lines
 * stacked on top of each other will be of similar length.
 *
 * This prevents widow words on new lines inside of a responsive
 * design where content is dynamic and subject to change.
 *
 * A default step size tolerance of 10px can be overridden by
 * supplying a data attribute to the element to be balanced.
 */

/* eslint-disable import/prefer-default-export */
function balance() {
  var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var balanceHandle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.balance';
  var els = container.querySelectorAll(balanceHandle);
  Array.from(els).forEach(function (el) {
    // Don't rebalance lines
    if (el.getAttribute('data-balanced')) return; // Allow for overriding default step size per element

    var stepSize = el.getAttribute('data-step-size') || 10; // Set element to default width

    el.style.maxWidth = 'inherit'; // Capture initial height and width

    var height = el.offsetHeight;
    var width = el.offsetWidth; // Bug fix for trying to balance display none elements

    if (height === 0) {
      return;
    } // Set initial height and width to monitor during shrinking


    var nextHeight = height;
    var nextWidth = width; // Shrink until height changes

    while (nextHeight === height) {
      nextWidth -= stepSize;
      el.style.maxWidth = "".concat(nextWidth, "px");
      nextHeight = el.offsetHeight;
    } // Add back previous step and set max width to remove widow caused by shrinking


    el.style.maxWidth = "".concat(nextWidth + stepSize * 3, "px"); // Mark as balanced

    el.setAttribute('data-balanced', true);
  });
}
/* eslint-enable import/prefer-default-export */