"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncDates = syncDates;

/**
 * Utility function to sync a pair of date fields
 * s.t. the second (end) date field will not allow
 * selection of date less than the first (start)
 * date and will open at the date entered into start
 */

/* eslint-disable import/prefer-default-export */
function syncDates(start, end) {
  function handleStart() {
    end.setAttribute('min', start.value);
  }

  function handleFocus() {
    end.value = start.value;
  }

  start.addEventListener('change', handleStart);
  end.addEventListener('focus', handleFocus);
}
/* eslint-enable import/prefer-default-export */