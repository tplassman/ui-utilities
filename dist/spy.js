"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sections = sections;
exports.anchors = anchors;
exports.nav = nav;
exports.images = images;

var _debouncer = _interopRequireDefault(require("./debouncer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Spy sections and add class when in view
 * @param {string} sectionHandle
 * @param {string} inViewClass
 */
function sections() {
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
 * Spy sections and set correspond link to active
 * @param {object}
 * |_@param {nodeList} links
 * |_@param {nodeList} section
 * |_@param {string} activeClass
 * |_@param {float} threshold
 * |_@param {function} cb
 *   |_@param {node} activeAnchor
 */


function anchors(_ref) {
  var _ref$links = _ref.links,
      links = _ref$links === void 0 ? [] : _ref$links,
      _ref$activeClass = _ref.activeClass,
      activeClass = _ref$activeClass === void 0 ? 'is-active' : _ref$activeClass,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? window.innerHeight / 2 : _ref$threshold,
      _ref$scrollContainer = _ref.scrollContainer,
      scrollContainer = _ref$scrollContainer === void 0 ? window : _ref$scrollContainer,
      _ref$cb = _ref.cb,
      cb = _ref$cb === void 0 ? null : _ref$cb;
  var sections = Array.from(links).map(function (l) {
    return document.getElementById(l.href.split('#')[1]);
  });
  if (sections.length === 0) return;

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


function nav(_ref2) {
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

function images() {
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