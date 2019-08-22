'use strict';

(function() {
  function getNumericalValue(str) {
    return Number(str.match(/\d+/));
  }

  function getCoords(elem) { // Координаты элемента относительно окна браузера, возвращает {left: .., top: ..} (кроме IE8-)
    var box = elem.getBoundingClientRect();
  
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  window.utils = {
    getNumericalValue: getNumericalValue,
    getCoords: getCoords
  }
}())