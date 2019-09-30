"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emit = emit;
exports.on = on;

/**
 * Emit event - wrapper around CustomEvent API
 * @param {string} eventHandle
 * @param {object} eventDetails
 * @param {EventTarget} target
 */
function emit(eventHandle, eventDetails) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  var event = new CustomEvent(eventHandle, {
    detail: eventDetails
  });
  target.dispatchEvent(event);
}
/**
 * Listen for custom event and execute callback on EventTarget
 * @param {string} eventHandle
 * @param {function} cb
 * @param {EventTarget} target
 */


function on(eventHandle, cb) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  target.addEventListener(eventHandle, cb);
}