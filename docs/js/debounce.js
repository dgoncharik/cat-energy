'use strict';

(function() {
  window.debounce = function(fn, intervall) {
    var timeout = null;

    return function() {
      var args = arguments;
      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(function() {
        fn.apply(null, args);
      }, intervall)
    }
  }
}())