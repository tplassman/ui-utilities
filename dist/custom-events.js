"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emit = emit;

/**
 * Emit event - wrapper around CustomEvent API
 * @param {string} eventHandle
 * @param {object} eventDetails
 */

/* eslint-disable import/prefer-default-export */
function emit(eventHandle, eventDetails) {
  var event = new CustomEvent(eventHandle, {
    detail: eventDetails
  });
  window.dispatchEvent(event);
}
/* eslint-enable import/prefer-default-export */