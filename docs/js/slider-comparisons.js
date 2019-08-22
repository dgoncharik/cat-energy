'use strict';

(function() {
  var slider = document.querySelector('.comparisons__pictures');
  var imgBefore = slider.querySelector('.comparisons__before-picture-wrapper');
  var imgAfter = slider.querySelector('.comparisons__after-picture-wrapper');
  var Percent = {
    HIDE_AFTER: 0,
    SHOW_FULL_AFTER: 100
  };

  function defaultPosition() {
    enableTransition();
    imgAfter.style.width = '';
    imgBefore.style.width = '';
  }

  function enableTransition() {
    imgBefore.style.transition = '';
    imgAfter.style.transition = '';
  }

  function disableTransition() {
    imgBefore.style.transition = 'none';
    imgAfter.style.transition = 'none';
  }

  function showAfter(percent) {
    percent == Percent.HIDE_AFTER || percent == Percent.SHOW_FULL_AFTER ? enableTransition() : disableTransition();
    imgAfter.style.width = percent +'%';
  }

  window.sliderComparisons = {
    showAfter: showAfter
  };
}())