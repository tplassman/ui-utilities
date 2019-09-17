"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toQueryString = toQueryString;
exports.get = get;
exports.post = post;

/**
 * Helper function to convery object to query string
 * @param {object} obj
 */
function toQueryString() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(obj).map(function (key) {
    return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key]));
  }).join('&');
}
/**
 * Get shared markup
 * @param {string} url
 * @param {object} query
 * @param {object} state
 * @param {function} cb
 * @return {void}
 */


function get(_ref) {
  var url = _ref.url,
      query = _ref.query,
      _ref$state = _ref.state,
      state = _ref$state === void 0 ? null : _ref$state,
      _ref$cb = _ref.cb,
      cb = _ref$cb === void 0 ? null : _ref$cb;
  var xhr = new XMLHttpRequest(); // Event handler functions

  function handleReadyStateChange() {
    if (xhr.readyState !== 4) return; // Update URL

    if (state && window.history && window.history.pushState) {
      var stateUrl = state.query ? "".concat(state.url, "?").concat(toQueryString(state.query)) : state.url;
      window.history.pushState(state, null, stateUrl);
    } // Callback


    if (cb) cb(xhr.responseText);
  }

  if (query) {
    url = "".concat(url, "?").concat(toQueryString(query));
  }

  xhr.open('GET', url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Accept', 'text/html, application/json');
  xhr.onreadystatechange = handleReadyStateChange;
  xhr.send();
}
/**
 * Add user section record and update topic tracker component
 * @param {string} url
 * @param {object} formData
 * @param {object} state
 * @param {function} cb
 * @return {void}
 */


function post(_ref2) {
  var _ref2$url = _ref2.url,
      url = _ref2$url === void 0 ? '/' : _ref2$url,
      formData = _ref2.formData,
      _ref2$state = _ref2.state,
      state = _ref2$state === void 0 ? null : _ref2$state,
      _ref2$cb = _ref2.cb,
      cb = _ref2$cb === void 0 ? null : _ref2$cb;
  var xhr = new XMLHttpRequest(); // Event handler functions

  function handleReadyStateChange() {
    if (xhr.readyState !== 4) return; // Update URL

    if (state && window.history && window.history.pushState) {
      window.history.pushState(state, null);
    } // Callback


    if (cb) cb(xhr.responseText);
  }

  xhr.open('POST', url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Accept', 'text/html, application/json');
  xhr.onreadystatechange = handleReadyStateChange;
  xhr.send(formData);
}