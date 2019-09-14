(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

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
function _default() {
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(func) {
  var _this = this;

  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var immediate = arguments.length > 2 ? arguments[2] : undefined;
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;

      if (!immediate) {
        func.apply(_this, args);
      }
    }, wait);

    if (immediate && !timeout) {
      func.apply(_this, args);
    }
  };
}

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

var _balance = _interopRequireDefault(require("./balance"));

var events = _interopRequireWildcard(require("./custom-events"));

var _debouncer = _interopRequireDefault(require("./debouncer"));

var forms = _interopRequireWildcard(require("./forms"));

var router = _interopRequireWildcard(require("./router"));

var scroll = _interopRequireWildcard(require("./scroll"));

var spy = _interopRequireWildcard(require("./spy"));

var text = _interopRequireWildcard(require("./text"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports = {
  balance: _balance["default"],
  events: events,
  forms: forms,
  router: router,
  scroll: scroll,
  spy: spy,
  text: text,
  throttle: _debouncer["default"]
};

},{"./balance":1,"./custom-events":2,"./debouncer":3,"./forms":4,"./router":6,"./scroll":7,"./spy":8,"./text":9}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollTo = scrollTo;
exports.scrollTop = scrollTop;
exports.scrollBottom = scrollBottom;

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


function scrollTo(anchor) {
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


function scrollTop() {
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


function scrollBottom() {
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

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spySections = spySections;
exports.spyAnchors = spyAnchors;
exports.spyNav = spyNav;
exports.spyImages = spyImages;

var _debouncer = _interopRequireDefault(require("./debouncer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Spy sections and add class when in view
 * @param {string} sectionHandle
 * @param {string} inViewClass
 */
function spySections() {
  var sectionHandle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.spy';
  var inViewClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'in-view';
  var sections = document.querySelectorAll(sectionHandle); // Event handler functions

  function handleScroll(entries, observer) {
    if (entries.length === 0) {
      observer.disconnect();
    }

    Array.from(entries).filter(function (entry) {
      return entry.target.classList.contains(inViewClass) || entry.intersectionRatio > (entry.target.getAttribute('data-threshold') || 0.5);
    }).forEach(function (entry) {
      entry.target.classList.add(inViewClass);
      observer.unobserve(entry.target);
    });
  } // Initialize


  var observer = new IntersectionObserver(handleScroll, {
    // Call at multiple thresholds to allow for customization via data attribute
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });
  Array.from(sections).forEach(function (section) {
    observer.observe(section);
  });
}
/**
 * Spy section and set correspond link to active
 * @param {object}
 * |_@param {nodeList} links
 * |_@param {nodeList} section
 * |_@param {string} activeClass
 * |_@param {float} threshold
 * |_@param {function} cb
 *   |_@param {node} activeAnchor
 */


function spyAnchors(_ref) {
  var _ref$links = _ref.links,
      links = _ref$links === void 0 ? [] : _ref$links,
      _ref$sections = _ref.sections,
      sections = _ref$sections === void 0 ? [] : _ref$sections,
      _ref$activeClass = _ref.activeClass,
      activeClass = _ref$activeClass === void 0 ? 'is-active' : _ref$activeClass,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? window.innerHeight / 2 : _ref$threshold,
      _ref$scrollContainer = _ref.scrollContainer,
      scrollContainer = _ref$scrollContainer === void 0 ? window : _ref$scrollContainer,
      _ref$cb = _ref.cb,
      cb = _ref$cb === void 0 ? null : _ref$cb;
  if (!sections) return;

  function handleScroll() {
    Array.from(sections).forEach(function (section, i) {
      if (section === null) {
        return;
      }

      var rect = section.getBoundingClientRect();
      if (rect.top > threshold || rect.bottom < threshold) return;
      var activeAnchors = Array.from(links).filter(function (link, ii) {
        return link.classList.toggle(activeClass, i === ii);
      });
      if (!cb) return;
      cb(activeAnchors[0]);
    });
  }

  scrollContainer.addEventListener('scroll', handleScroll);
}
/**
 * Spy section and set correspond link to active
 * @param {object}
 * |_@param {node} el - the DOM element to watch
 * |_@param {string} fixedClass
 * |_@param {float} threshold
 * |_@param {function} cb
 *   |_@param {bool} fixed
 */


function spyNav(_ref2) {
  var el = _ref2.el,
      _ref2$fixedClass = _ref2.fixedClass,
      fixedClass = _ref2$fixedClass === void 0 ? 'is-fixed' : _ref2$fixedClass,
      _ref2$threshold = _ref2.threshold,
      threshold = _ref2$threshold === void 0 ? 1 : _ref2$threshold,
      cb = _ref2.cb;
  var delta = 5; // State variables

  var enabled = false;
  var lastY = 0; // Event handler functions

  var handleScroll = (0, _debouncer["default"])(function () {
    // Only peek header if nav to spy is fixed/enabled
    if (!enabled) {
      lastY = 0;
      return;
    }

    var thisY = window.pageYOffset; // Add delta for sensitivity threshold

    if (Math.abs(thisY - lastY) < delta) {
      return;
    }

    cb(thisY > lastY);
    lastY = thisY;
  }, 250);

  function handleFixObserver(entries) {
    // Toggle enabled state variable to conditionally process header peek on scroll up
    enabled = el.classList.toggle(fixedClass, entries[0].boundingClientRect.top < 0);
    cb(enabled);
  } // Add event listeners


  window.addEventListener('scroll', handleScroll);
  var fixObserver = new IntersectionObserver(handleFixObserver, {
    threshold: threshold
  });
  fixObserver.observe(el);
}

function spyImages() {
  var images = document.querySelectorAll('[loading="lazy"]');

  function handleObserver(entries, observer) {
    entries.filter(function (entry) {
      return entry.isIntersecting;
    }).forEach(function (entry) {
      var image = entry.target;
      var src = image.dataset.src;

      switch (image.nodeName) {
        case 'DIV':
          image.style.backgroundImage = "url(".concat(src, ")");
          break;

        case 'SOURCE':
          image.srcset = src;
          break;

        default:
          image.src = src;
      }

      image.style.opacity = 1;
      image.removeAttribute('loading');
      observer.unobserve(image);
    });
  }

  var nativeSupport = 'loading' in HTMLImageElement.prototype;
  var observer = new IntersectionObserver(handleObserver, {
    threshold: 0.1
  });
  images.forEach(function (image) {
    if (!nativeSupport || image.nodeName !== 'IMG') {
      observer.observe(image);
    } else {
      image.src = image.dataset.src;
    }
  });
}

},{"./debouncer":3}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.superscript = superscript;
exports.newlines = newlines;
var TAGS = 'h1,h2,h3,h4,h5,h6,p,strong,b,em,li,a,span,td';
var CHILD_TAGS = 'br,img,em';

function replace(from, to) {
  document.querySelectorAll(TAGS).forEach(function (el) {
    var childCheck = el.childNodes.length === 1 && CHILD_TAGS.includes(el.childNodes[0].nodeName.toLowerCase());

    if (el.childNodes.length === 0 || childCheck) {
      el.innerHTML = el.innerHTML.split(from).join(to);
    }
  });
}
/*
 * Superscript all registered trademarks
 * @return {void}
 */


function superscript() {
  replace('®', '<sup>&reg;</sup>');
}
/*
 * Remove all newline characters that are not stripped by server
 * https://stackoverflow.com/questions/41555397/strange-symbol-shows-up-on-website-l-sep/45822037
 * @return {void}
 */


function newlines() {
  replace('&#8232;', ' ');
}

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmFsYW5jZS5qcyIsInNyYy9jdXN0b20tZXZlbnRzLmpzIiwic3JjL2RlYm91bmNlci5qcyIsInNyYy9mb3Jtcy5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9yb3V0ZXIuanMiLCJzcmMvc2Nyb2xsLmpzIiwic3JjL3NweS5qcyIsInNyYy90ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7OztBQWNlLG9CQUE0RDtBQUFBLE1BQWxELFNBQWtELHVFQUF0QyxRQUFzQztBQUFBLE1BQTVCLGFBQTRCLHVFQUFaLFVBQVk7QUFDdkUsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLGdCQUFWLENBQTJCLGFBQTNCLENBQVo7QUFFQSxFQUFBLEtBQUssQ0FBQyxJQUFOLENBQVcsR0FBWCxFQUFnQixPQUFoQixDQUF3QixVQUFBLEVBQUUsRUFBSTtBQUMxQjtBQUNBLFFBQUksRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsZUFBaEIsQ0FBSixFQUFzQyxPQUZaLENBSTFCOztBQUNBLFFBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxZQUFILENBQWdCLGdCQUFoQixLQUFxQyxFQUF0RCxDQUwwQixDQU8xQjs7QUFDQSxJQUFBLEVBQUUsQ0FBQyxLQUFILENBQVMsUUFBVCxHQUFvQixTQUFwQixDQVIwQixDQVUxQjs7QUFDQSxRQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBbEI7QUFDQSxRQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBakIsQ0FaMEIsQ0FjMUI7O0FBQ0EsUUFBSSxNQUFNLEtBQUssQ0FBZixFQUFrQjtBQUNkO0FBQ0gsS0FqQnlCLENBbUIxQjs7O0FBQ0EsUUFBSSxVQUFVLEdBQUcsTUFBakI7QUFDQSxRQUFJLFNBQVMsR0FBRyxLQUFoQixDQXJCMEIsQ0F1QjFCOztBQUNBLFdBQU8sVUFBVSxLQUFLLE1BQXRCLEVBQThCO0FB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T0g7Ozs7Ozs7Ozs7QUMxS0QsSUFBTSxJQUFJLEdBQUcsOENBQWI7QUFDQSxJQUFNLFVBQVUsR0FBRyxXQUFuQjs7QUFFQSxTQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFBdUIsRUFBdkIsRUFBMkI7QUFDdkIsRUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsSUFBMUIsRUFBZ0MsT0FBaEMsQ0FBd0MsVUFBQSxFQUFFLEVBQUk7QUFDMUMsUUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFVBQUgsQ0FBYyxNQUFkLEtBQXlCLENBQXpCLElBQ1osVUFBVSxDQUFDLFFBQVgsQ0FBb0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxDQUFkLEVBQWlCLFFBQWpCLENBQTBCLFdBQTFCLEVBQXBCLENBRFA7O0FBR0EsUUFBSSxFQUFFLENBQUMsVUFBSCxDQUFjLE1BQWQsS0FBeUIsQ0FBekIsSUFBOEIsVUFBbEMsRUFBOEM7QUFDMUMsTUFBQSxFQUFFLENBQUMsU0FBSCxHQUFlLEVBQUUsQ0FBQyxTQUFILENBQWEsS0FBYixDQUFtQixJQUFuQixFQUF5QixJQUF6QixDQUE4QixFQUE5QixDQUFmO0FBQ0g7QUFDSixHQVBEO0FBUUg7QUFFRDs7Ozs7O0FBSU8sU0FBUyxXQUFULEdBQXVCO0FBQzFCLEVBQUEsT0FBTyxDQUFDLEdBQUQsRUFBTSxrQkFBTixDQUFQO0FBQ0g7QUFFRDs7Ozs7OztBQUtPLFNBQVMsUUFBVCxHQUFvQjtBQUN2QixFQUFBLE9BQU8sQ0FBQyxTQUFELEVBQVksR0FBWixDQUFQO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIEZ1bmN0aW9uIGJhbGFuY2VcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyIC0gRE9NIEVsZW1lbnQgdG8gc2VhcmNoIGluc2lkZSBmb3IgZWxlbWVudHMgdG8gYmFsYW5jZVxuICogQHBhcmFtIHtzZWxlY3Rvcn0gYmFsYW5jZUhhbmRsZSAtIENTUyBzZWxlY3RvciBhcHBsaWVkIHRvIGVsZW1lbnRzIHRvIGJlIGJhbGFuY2VkXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJhbGFuY2UgbGluZXMgb2YgdGV4dCBzdWNoIHRoYXQgbGluZXNcbiAqIHN0YWNrZWQgb24gdG9wIG9mIGVhY2ggb3RoZXIgd2lsbCBiZSBvZiBzaW1pbGFyIGxlbmd0aC5cbiAqXG4gKiBUaGlzIHByZXZlbnRzIHdpZG93IHdvcmRzIG9uIG5ldyBsaW5lcyBpbnNpZGUgb2YgYSByZXNwb25zaXZlXG4gKiBkZXNpZ24gd2hlcmUgY29udGVudCBpcyBkeW5hbWljIGFuZCBzdWJqZWN0IHRvIGNoYW5nZS5cbiAqXG4gKiBBIGRlZmF1bHQgc3RlcCBzaXplIHRvbGVyYW5jZSBvZiAxMHB4IGNhbiBiZSBvdmVycmlkZGVuIGJ5XG4gKiBzdXBwbHlpbmcgYSBkYXRhIGF0dHJpYnV0ZSB0byB0aGUgZWxlbWVudCB0byBiZSBiYWxhbmNlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvbnRhaW5lciA9IGRvY3VtZW50LCBiYWxhbmNlSGFuZGxlID0gJy5iYWxhbmNlJykge1xuICAgIGNvbnN0IGVscyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGJhbGFuY2VIYW5kbGUpO1xuXG4gICAgQXJyYXkuZnJvbShlbHMpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAvLyBEb24ndCByZWJhbGFuY2UgbGluZXNcbiAgICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1iYWxhbmNlZCcpKSByZXR1cm47XG5cbiAgICAgICAgLy8gQWxsb3cgZm9yIG92ZXJyaWRpbmcgZGVmYXVsdCBzdGVwIHNpemUgcGVyIGVsZW1lbnRcbiAgICAgICAgY29uc3Qgc3RlcFNpemUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RlcC1zaXplJykgfHwgMTA7XG5cbiAgICAgICAgLy8gU2V0IGVsZW1lbnQgdG8gZGVmYXVsdCB3aWR0aFxuICAgICAgICBlbC5zdHlsZS5tYXhXaWR0aCA9ICdpbmhlcml0JztcblxuICAgICAgICAvLyBDYXB0dXJlIGluaXRpYWwgaGVpZ2h0IGFuZCB3aWR0aFxuICAgICAgICBjb25zdCBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgLy8gQnVnIGZpeCBmb3IgdHJ5aW5nIHRvIGJhbGFuY2UgZGlzcGxheSBub25lIGVsZW1lbnRzXG4gICAgICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBpbml0aWFsIGhlaWdodCBhbmQgd2lkdGggdG8gbW9uaXRvciBkdXJpbmcgc2hyaW5raW5nXG4gICAgICAgIGxldCBuZXh0SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBsZXQgbmV4dFdpZHRoID0gd2lkdGg7XG5cbiAgICAgICAgLy8gU2hyaW5rIHVudGlsIGhlaWdodCBjaGFuZ2VzXG4gICAgICAgIHdoaWxlIChuZXh0SGVpZ2h0ID09PSBoZWlnaHQpIHtcbiAgICAgICAgICAgIG5leHRXaWR0aCAtPSBzdGVwU2l6ZTtcblxuICAgICAgICAgICAgZWwuc3R5bGUubWF4V2lkdGggPSBgJHtuZXh0V2lkdGh9cHhgO1xuICAgICAgICAgICAgbmV4dEhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBiYWNrIHByZXZpb3VzIHN0ZXAgYW5kIHNldCBtYXggd2lkdGggdG8gcmVtb3ZlIHdpZG93IGNhdXNlZCBieSBzaHJpbmtpbmdcbiAgICAgICAgZWwuc3R5bGUubWF4V2lkdGggPSBgJHtuZXh0V2lkdGggKyAoc3RlcFNpemUgKiAzKX1weGA7XG5cbiAgICAgICAgLy8gTWFyayBhcyBiYWxhbmNlZFxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmFsYW5jZWQnLCB0cnVlKTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuICogRW1pdCBldmVudCAtIHdyYXBwZXIgYXJvdW5kIEN1c3RvbUV2ZW50IEFQSVxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50SGFuZGxlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnREZXRhaWxzXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBlbWl0KGV2ZW50SGFuZGxlLCBldmVudERldGFpbHMpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudEhhbmRsZSwgeyBkZXRhaWw6IGV2ZW50RGV0YWlscyB9KTtcblxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cbi8qIGVzbGludC1lbmFibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZ1bmMsIHdhaXQgPSAwLCBpbW1lZGlhdGUpIHtcbiAgICBsZXQgdGltZW91dDtcblxuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB3YWl0KTtcblxuICAgICAgICBpZiAoaW1tZWRpYXRlICYmICF0aW1lb3V0KSB7XG4gICAgICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsIi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiB0byBzeW5jIGEgcGFpciBvZiBkYXRlIGZpZWxkc1xuICogcy50LiB0aGUgc2Vjb25kIChlbmQpIGRhdGUgZmllbGQgd2lsbCBub3QgYWxsb3dcbiAqIHNlbGVjdGlvbiBvZiBkYXRlIGxlc3MgdGhhbiB0aGUgZmlyc3QgKHN0YXJ0KVxuICogZGF0ZSBhbmQgd2lsbCBvcGVuIGF0IHRoZSBkYXRlIGVudGVyZWQgaW50byBzdGFydFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5leHBvcnQgZnVuY3Rpb24gc3luY0RhdGVzKHN0YXJ0LCBlbmQpIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVTdGFydCgpIHtcbiAgICAgICAgZW5kLnNldEF0dHJpYnV0ZSgnbWluJywgc3RhcnQudmFsdWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVGb2N1cygpIHtcbiAgICAgICAgZW5kLnZhbHVlID0gc3RhcnQudmFsdWU7XG4gICAgfVxuXG4gICAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlU3RhcnQpO1xuICAgIGVuZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGhhbmRsZUZvY3VzKTtcbn1cbi8qIGVzbGludC1lbmFibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuIiwiaW1wb3J0IGJhbGFuY2UgZnJvbSAnLi9iYWxhbmNlJztcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICcuL2N1c3RvbS1ldmVudHMnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJy4vZGVib3VuY2VyJztcbmltcG9ydCAqIGFzIGZvcm1zIGZyb20gJy4vZm9ybXMnO1xuaW1wb3J0ICogYXMgcm91dGVyIGZyb20gJy4vcm91dGVyJztcbmltcG9ydCAqIGFzIHNjcm9sbCBmcm9tICcuL3Njcm9sbCc7XG5pbXBvcnQgKiBhcyBzcHkgZnJvbSAnLi9zcHknO1xuaW1wb3J0ICogYXMgdGV4dCBmcm9tICcuL3RleHQnO1xuXG5leHBvcnRzID0ge1xuICAgIGJhbGFuY2UsXG4gICAgZXZlbnRzLFxuICAgIGZvcm1zLFxuICAgIHJvdXRlcixcbiAgICBzY3JvbGwsXG4gICAgc3B5LFxuICAgIHRleHQsXG4gICAgdGhyb3R0bGUsXG59O1xuIiwiLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY29udmVyeSBvYmplY3QgdG8gcXVlcnkgc3RyaW5nXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1F1ZXJ5U3RyaW5nKG9iaiA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcbiAgICAgICAgLm1hcChrZXkgPT4gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKX1gKVxuICAgICAgICAuam9pbignJicpO1xufVxuXG4vKipcbiAqIEdldCBzaGFyZWQgbWFya3VwXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge29iamVjdH0gcXVlcnlcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2JcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXQoeyB1cmwsIHF1ZXJ5LCBzdGF0ZSA9IG51bGwsIGNiID0gbnVsbCB9KSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBFdmVudCBoYW5kbGVyIGZ1bmN0aW9uc1xuICAgIGZ1bmN0aW9uIGhhbmRsZVJlYWR5U3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBVUkxcbiAgICAgICAgaWYgKHN0YXRlICYmIHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGVVcmwgPSBzdGF0ZS5xdWVyeVxuICAgICAgICAgICAgICAgID8gYCR7c3RhdGUudXJsfT8ke3RvUXVlcnlTdHJpbmcoc3RhdGUucXVlcnkpfWBcbiAgICAgICAgICAgICAgICA6IHN0YXRlLnVybDtcblxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCBudWxsLCBzdGF0ZVVybCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxsYmFja1xuICAgICAgICBpZiAoY2IpIGNiKHhoci5yZXNwb25zZVRleHQpO1xuICAgIH1cblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgICB1cmwgPSBgJHt1cmx9PyR7dG9RdWVyeVN0cmluZyhxdWVyeSl9YDtcbiAgICB9XG5cbiAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAndGV4dC9odG1sLCBhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZVJlYWR5U3RhdGVDaGFuZ2U7XG4gICAgeGhyLnNlbmQoKTtcbn1cblxuLyoqXG4gKiBBZGQgdXNlciBzZWN0aW9uIHJlY29yZCBhbmQgdXBkYXRlIHRvcGljIHRyYWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge29iamVjdH0gZm9ybURhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2JcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb3N0KHsgdXJsID0gJy8nLCBmb3JtRGF0YSwgc3RhdGUgPSBudWxsLCBjYiA9IG51bGwgfSkge1xuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gRXZlbnQgaGFuZGxlciBmdW5jdGlvbnNcbiAgICBmdW5jdGlvbiBoYW5kbGVSZWFkeVN0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcblxuICAgICAgICAvLyBVcGRhdGUgVVJMXG4gICAgICAgIGlmIChzdGF0ZSAmJiB3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxsYmFja1xuICAgICAgICBpZiAoY2IpIGNiKHhoci5yZXNwb25zZVRleHQpO1xuICAgIH1cblxuICAgIHhoci5vcGVuKCdQT1NUJywgdXJsKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAndGV4dC9odG1sLCBhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZVJlYWR5U3RhdGVDaGFuZ2U7XG4gICAgeGhyLnNlbmQoZm9ybURhdGEpO1xufVxuIiwiLyoqXG4gKiBMaWJyYXJ5IGZvciBoYW5kbGluZyBzY3JvbGxpbmcgZnVuY3Rpb25hbGl0eVxuICovXG5cbmNvbnN0IFNDUk9MTF9SQVRFID0gMSAvIDEwO1xuY29uc3QgRkFTVF9TQ1JPTExfUkFURSA9IDEgLyAyO1xuXG5sZXQgdGltZXIgPSAwO1xubGV0IHRpbWVyRnVuY3Rpb24gPSBudWxsO1xuXG5mdW5jdGlvbiBzY3JvbGwodGFyZ2V0LCBjYiwgZmFzdCA9IGZhbHNlKSB7XG4gICAgLy8gTG9ncml0aG1pYyBzY3JvbGwgcmF0ZSAoaGlnaGVyIHNjcm9sbHMgZmFzdGVyKVxuICAgIGNvbnN0IHNjcm9sbFJhdGUgPSBmYXN0ID8gRkFTVF9TQ1JPTExfUkFURSA6IFNDUk9MTF9SQVRFO1xuICAgIC8vIEN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uXG4gICAgY29uc3QgY3VycmVudCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAvLyBTZXQgZmxhZyBmb3Igc2Nyb2xsIGRpcmVjdGlvblxuICAgIGNvbnN0IGRvd24gPSBjdXJyZW50IDwgdGFyZ2V0O1xuICAgIC8vIFNldCBzdGVwIGJhc2VkIG9uIHNjcm9sbCByYXRlXG4gICAgY29uc3Qgc3RlcCA9IChNYXRoLmFicyhjdXJyZW50IC0gdGFyZ2V0KSAqIHNjcm9sbFJhdGUpICsgMTtcbiAgICAvLyBTZXQgbmV4dCBwb3NpdGlvbiBiYXNlZCBvbiBzY3JvbGwgZGlyZWN0aW9uXG4gICAgY29uc3QgbmV4dCA9IGRvd24gPyBjdXJyZW50ICsgc3RlcCA6IGN1cnJlbnQgLSBzdGVwO1xuICAgIC8vIFNldCBwYXN0IGZsYWcgYmFzZWQgb24gc2Nyb2xsIGRpcmVjdGlvblxuICAgIGNvbnN0IGlzUGFzdCA9IGRvd24gPyBuZXh0ID49IHRhcmdldCA6IG5leHQgPD0gdGFyZ2V0O1xuICAgIC8vIFNldCBmbGFnIHRvIGNoZWNrIGlmIGF0IGJvdHRvbSBvZiB3aW5kb3cgZm9yIHNjcm9sbGluZyBkb3duXG4gICAgY29uc3QgdG9sZXJhbmNlID0gNTtcbiAgICBjb25zdCBhdEJvdHRvbSA9IGRvd25cbiAgICAgICAgPyAod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnBhZ2VZT2Zmc2V0ICsgdG9sZXJhbmNlKSA+PSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodFxuICAgICAgICA6IGZhbHNlO1xuXG4gICAgLy8gU2Nyb2xsIHRvIG5leHQgcG9zaXRpb25cbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbmV4dCk7XG5cbiAgICBpZiAoIWlzUGFzdCAmJiAhYXRCb3R0b20gJiYgdGltZXIpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBzY3JvbGwodGFyZ2V0LCBjYikpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2IpIGNiKCk7XG59XG5cbi8qKlxuICogU3RvcCByZXF1ZXN0aW5nIGFuaW1hdGlvbiBmcmFtZXMgYWZ0ZXIgcnVubmluZyBmb3IgbiBzZWNvbmRzXG4gKiBUaGlzIGZpeGVzIGNhc2Ugb2Ygc2Nyb2xsIGZ1bmN0aW9uIG5ldmVyIGZpbmlzaGluZyBpZiBjYWxsZWQgdHdpY2UgYmVmb3JlIHRoZSBmaXJzdCBmaW5pc2hlc1xuICovXG5mdW5jdGlvbiBzZXRUaW1lcigpIHtcbiAgICB0aW1lciA9IDE7XG4gICAgdGltZXJGdW5jdGlvbiA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IDA7XG4gICAgfSwgMjUwMCk7XG59XG5cbi8qKlxuICogU2Nyb2xsIHRvIGVsZW1lbnQgc3BlY2lmaWVkIGJ5IGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gYW5jaG9yIC0gZWxlbWVudCBpZFxuICogQHBhcmFtIHtpbnR9IG9mZnNldFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2JcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxUbyhhbmNob3IsIG9mZnNldCA9IDAsIGNiID0gbnVsbCkge1xuICAgIC8vIEdldCBlbGVtZW50IHRvIHNjcm9sbFxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5jaG9yKTtcbiAgICAvLyBHZXQgcG9zaXRpb24gb2YgZWxlbWVudFxuICAgIGNvbnN0IHRvcCA9IChlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQpIC0gb2Zmc2V0O1xuXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyRnVuY3Rpb24pO1xuICAgIHNldFRpbWVyKCk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBzY3JvbGwodG9wLCBjYikpO1xuXG4gICAgLy8gVXBkYXRlIFVSTCBoYXNoXG4gICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUod2luZG93Lmhpc3Rvcnkuc3RhdGUsIG51bGwsIGAjJHthbmNob3J9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBgIyR7YW5jaG9yfWA7XG4gICAgfVxufVxuXG4vKipcbiAqIFNjcm9sbCB0byB0b3Agb2YgZWxlbWVudFxuICogQHBhcmFtIHtub2RlfSBlbGVtZW50XG4gKiBAcGFyYW0ge2ludH0gb2Zmc2V0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbFRvcChlbCA9IGRvY3VtZW50LmJvZHksIG9mZnNldCA9IDAsIGNiID0gbnVsbCwgZmFzdCA9IGZhbHNlKSB7XG4gICAgLy8gR2V0IHRvcCBwb3NpdGlvbiBvZiBlbGVtZW50XG4gICAgY29uc3QgdG9wID0gKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCkgLSBvZmZzZXQ7XG5cbiAgICBjbGVhclRpbWVvdXQodGltZXJGdW5jdGlvbik7XG4gICAgc2V0VGltZXIoKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHNjcm9sbCh0b3AsIGNiLCBmYXN0KSk7XG59XG5cbi8qKlxuICogU2Nyb2xsIHRvIGJvdHRvbSBvZiBlbGVtZW50XG4gKiBAcGFyYW0ge25vZGV9IGVsZW1lbnRcbiAqIEBwYXJhbSB7aW50fSBvZmZzZXRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsQm90dG9tKGVsID0gZG9jdW1lbnQuYm9keSwgb2Zmc2V0ID0gMCwgY2IgPSBudWxsKSB7XG4gICAgLy8gR2V0IGJvdHRvbSBwb3NpdGlvbiBvZiBlbGVtZW50XG4gICAgY29uc3QgYm90dG9tID0gKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGVsLm9mZnNldEhlaWdodCArIHdpbmRvdy5wYWdlWU9mZnNldCkgLSBvZmZzZXQ7XG5cbiAgICBjbGVhclRpbWVvdXQodGltZXJGdW5jdGlvbik7XG4gICAgc2V0VGltZXIoKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHNjcm9sbChib3R0b20sIGNiKSk7XG59XG4iLCJpbXBvcnQgdGhyb3R0bGUgZnJvbSAnLi9kZWJvdW5jZXInO1xuXG4vKipcbiAqIFNweSBzZWN0aW9ucyBhbmQgYWRkIGNsYXNzIHdoZW4gaW4gdmlld1xuICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25IYW5kbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBpblZpZXdDbGFzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3B5U2VjdGlvbnMoc2VjdGlvbkhhbmRsZSA9ICcuc3B5JywgaW5WaWV3Q2xhc3MgPSAnaW4tdmlldycpIHtcbiAgICBjb25zdCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VjdGlvbkhhbmRsZSk7XG5cbiAgICAvLyBFdmVudCBoYW5kbGVyIGZ1bmN0aW9uc1xuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbChlbnRyaWVzLCBvYnNlcnZlcikge1xuICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEFycmF5LmZyb20oZW50cmllcylcbiAgICAgICAgICAgIC5maWx0ZXIoZW50cnkgPT4gKFxuICAgICAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoaW5WaWV3Q2xhc3MpXG4gICAgICAgICAgICAgICAgfHwgZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAoZW50cnkudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10aHJlc2hvbGQnKSB8fCAwLjUpXG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKGluVmlld0NsYXNzKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemVcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVTY3JvbGwsIHtcbiAgICAgICAgLy8gQ2FsbCBhdCBtdWx0aXBsZSB0aHJlc2hvbGRzIHRvIGFsbG93IGZvciBjdXN0b21pemF0aW9uIHZpYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICB0aHJlc2hvbGQ6IFswLCAwLjI1LCAwLjUsIDAuNzUsIDFdLFxuICAgIH0pO1xuICAgIEFycmF5LmZyb20oc2VjdGlvbnMpLmZvckVhY2goc2VjdGlvbiA9PiB7IG9ic2VydmVyLm9ic2VydmUoc2VjdGlvbik7IH0pO1xufVxuXG4vKipcbiAqIFNweSBzZWN0aW9uIGFuZCBzZXQgY29ycmVzcG9uZCBsaW5rIHRvIGFjdGl2ZVxuICogQHBhcmFtIHtvYmplY3R9XG4gKiB8X0BwYXJhbSB7bm9kZUxpc3R9IGxpbmtzXG4gKiB8X0BwYXJhbSB7bm9kZUxpc3R9IHNlY3Rpb25cbiAqIHxfQHBhcmFtIHtzdHJpbmd9IGFjdGl2ZUNsYXNzXG4gKiB8X0BwYXJhbSB7ZmxvYXR9IHRocmVzaG9sZFxuICogfF9AcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICogICB8X0BwYXJhbSB7bm9kZX0gYWN0aXZlQW5jaG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcHlBbmNob3JzKHtcbiAgICBsaW5rcyA9IFtdLFxuICAgIHNlY3Rpb25zID0gW10sXG4gICAgYWN0aXZlQ2xhc3MgPSAnaXMtYWN0aXZlJyxcbiAgICB0aHJlc2hvbGQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyLFxuICAgIHNjcm9sbENvbnRhaW5lciA9IHdpbmRvdyxcbiAgICBjYiA9IG51bGwsXG59KSB7XG4gICAgaWYgKCFzZWN0aW9ucykgcmV0dXJuO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsKCkge1xuICAgICAgICBBcnJheS5mcm9tKHNlY3Rpb25zKS5mb3JFYWNoKChzZWN0aW9uLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgIGlmIChyZWN0LnRvcCA+IHRocmVzaG9sZCB8fCByZWN0LmJvdHRvbSA8IHRocmVzaG9sZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVBbmNob3JzID0gQXJyYXkuZnJvbShsaW5rcylcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChsaW5rLCBpaSkgPT4gbGluay5jbGFzc0xpc3QudG9nZ2xlKGFjdGl2ZUNsYXNzLCBpID09PSBpaSkpO1xuXG4gICAgICAgICAgICBpZiAoIWNiKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNiKGFjdGl2ZUFuY2hvcnNbMF0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzY3JvbGxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcbn1cblxuLyoqXG4gKiBTcHkgc2VjdGlvbiBhbmQgc2V0IGNvcnJlc3BvbmQgbGluayB0byBhY3RpdmVcbiAqIEBwYXJhbSB7b2JqZWN0fVxuICogfF9AcGFyYW0ge25vZGV9IGVsIC0gdGhlIERPTSBlbGVtZW50IHRvIHdhdGNoXG4gKiB8X0BwYXJhbSB7c3RyaW5nfSBmaXhlZENsYXNzXG4gKiB8X0BwYXJhbSB7ZmxvYXR9IHRocmVzaG9sZFxuICogfF9AcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICogICB8X0BwYXJhbSB7Ym9vbH0gZml4ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNweU5hdih7XG4gICAgZWwsXG4gICAgZml4ZWRDbGFzcyA9ICdpcy1maXhlZCcsXG4gICAgdGhyZXNob2xkID0gMSxcbiAgICBjYixcbn0pIHtcbiAgICBjb25zdCBkZWx0YSA9IDU7XG5cbiAgICAvLyBTdGF0ZSB2YXJpYWJsZXNcbiAgICBsZXQgZW5hYmxlZCA9IGZhbHNlO1xuICAgIGxldCBsYXN0WSA9IDA7XG5cbiAgICAvLyBFdmVudCBoYW5kbGVyIGZ1bmN0aW9uc1xuICAgIGNvbnN0IGhhbmRsZVNjcm9sbCA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgICAgLy8gT25seSBwZWVrIGhlYWRlciBpZiBuYXYgdG8gc3B5IGlzIGZpeGVkL2VuYWJsZWRcbiAgICAgICAgaWYgKCFlbmFibGVkKSB7XG4gICAgICAgICAgICBsYXN0WSA9IDA7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRoaXNZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgICAgIC8vIEFkZCBkZWx0YSBmb3Igc2Vuc2l0aXZpdHkgdGhyZXNob2xkXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzWSAtIGxhc3RZKSA8IGRlbHRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYih0aGlzWSA+IGxhc3RZKTtcblxuICAgICAgICBsYXN0WSA9IHRoaXNZO1xuICAgIH0sIDI1MCk7XG4gICAgZnVuY3Rpb24gaGFuZGxlRml4T2JzZXJ2ZXIoZW50cmllcykge1xuICAgICAgICAvLyBUb2dnbGUgZW5hYmxlZCBzdGF0ZSB2YXJpYWJsZSB0byBjb25kaXRpb25hbGx5IHByb2Nlc3MgaGVhZGVyIHBlZWsgb24gc2Nyb2xsIHVwXG4gICAgICAgIGVuYWJsZWQgPSBlbC5jbGFzc0xpc3QudG9nZ2xlKGZpeGVkQ2xhc3MsIGVudHJpZXNbMF0uYm91bmRpbmdDbGllbnRSZWN0LnRvcCA8IDApO1xuXG4gICAgICAgIGNiKGVuYWJsZWQpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcbiAgICBjb25zdCBmaXhPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVGaXhPYnNlcnZlciwgeyB0aHJlc2hvbGQgfSk7XG4gICAgZml4T2JzZXJ2ZXIub2JzZXJ2ZShlbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcHlJbWFnZXMoKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2xvYWRpbmc9XCJsYXp5XCJdJyk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVPYnNlcnZlcihlbnRyaWVzLCBvYnNlcnZlcikge1xuICAgICAgICBlbnRyaWVzXG4gICAgICAgICAgICAuZmlsdGVyKGVudHJ5ID0+IGVudHJ5LmlzSW50ZXJzZWN0aW5nKVxuICAgICAgICAgICAgLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlID0gZW50cnkudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3JjIH0gPSBpbWFnZS5kYXRhc2V0O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpbWFnZS5ub2RlTmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0RJVic6XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtzcmN9KWA7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnU09VUkNFJzpcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc3Jjc2V0ID0gc3JjO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWFnZS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgICBpbWFnZS5yZW1vdmVBdHRyaWJ1dGUoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoaW1hZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgbmF0aXZlU3VwcG9ydCA9ICdsb2FkaW5nJyBpbiBIVE1MSW1hZ2VFbGVtZW50LnByb3RvdHlwZTtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVPYnNlcnZlciwgeyB0aHJlc2hvbGQ6IDAuMSB9KTtcblxuICAgIGltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcbiAgICAgICAgaWYgKCFuYXRpdmVTdXBwb3J0IHx8IGltYWdlLm5vZGVOYW1lICE9PSAnSU1HJykge1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpbWFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBpbWFnZS5kYXRhc2V0LnNyYztcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiY29uc3QgVEFHUyA9ICdoMSxoMixoMyxoNCxoNSxoNixwLHN0cm9uZyxiLGVtLGxpLGEsc3Bhbix0ZCc7XG5jb25zdCBDSElMRF9UQUdTID0gJ2JyLGltZyxlbSc7XG5cbmZ1bmN0aW9uIHJlcGxhY2UoZnJvbSwgdG8pIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFRBR1MpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZENoZWNrID0gZWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICYmIENISUxEX1RBR1MuaW5jbHVkZXMoZWwuY2hpbGROb2Rlc1swXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBpZiAoZWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDAgfHwgY2hpbGRDaGVjaykge1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gZWwuaW5uZXJIVE1MLnNwbGl0KGZyb20pLmpvaW4odG8pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qXG4gKiBTdXBlcnNjcmlwdCBhbGwgcmVnaXN0ZXJlZCB0cmFkZW1hcmtzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VwZXJzY3JpcHQoKSB7XG4gICAgcmVwbGFjZSgnwq4nLCAnPHN1cD4mcmVnOzwvc3VwPicpO1xufVxuXG4vKlxuICogUmVtb3ZlIGFsbCBuZXdsaW5lIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IHN0cmlwcGVkIGJ5IHNlcnZlclxuICogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDE1NTUzOTcvc3RyYW5nZS1zeW1ib2wtc2hvd3MtdXAtb24td2Vic2l0ZS1sLXNlcC80NTgyMjAzN1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmVzKCkge1xuICAgIHJlcGxhY2UoJyYjODIzMjsnLCAnICcpO1xufVxuIl19
