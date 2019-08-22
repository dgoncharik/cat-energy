'use strict';

(function() {
  var TIME_RESIZE_DEBOUNCE = 250;
  var Breakpoint = {
    MOBILE: 320,
    TABLET: 768,
    DESKTOP: 1300
  };
  var _currentBreakpoint = null;

  function getNewBreackpoint() {
    var newBreakpoint;
    switch (true) {
      case (window.innerWidth < Breakpoint.TABLET):
          newBreakpoint = Breakpoint.MOBILE;
          break;
      case (window.innerWidth >= Breakpoint.DESKTOP):
          newBreakpoint = Breakpoint.DESKTOP;
          break;
      default:
          newBreakpoint = Breakpoint.TABLET;
          break;
    }
    return newBreakpoint;
  }

  function breakpointIsValid() {
    return getNewBreackpoint() == _currentBreakpoint;
  }

  function changeCurentBreakpoint() {
    _currentBreakpoint = getNewBreackpoint();
  }

  function onWindowResize() {
      if (!breakpointIsValid()) {
        changeCurentBreakpoint();
        window.range.resetPosition();
      }
  }

  window.range.initialize(Breakpoint.TABLET, window.sliderComparisons.showAfter);
  window.addEventListener('resize', window.debounce(onWindowResize, TIME_RESIZE_DEBOUNCE));
}())