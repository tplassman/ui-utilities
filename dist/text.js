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