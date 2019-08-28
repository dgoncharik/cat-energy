'use strict';

(function() {
  var TIME_RESIZE_DEBOUNCE = 250;
  var Breakpoint = {
    MOBILE: 320,
    TABLET: 768,
    DESKTOP: 1300
  };
  var _currentBreakpoint = getNewBreakpoint();

  function getNewBreakpoint() {
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

  function breakpointChanged() {
    var newBreakpoint = getNewBreakpoint();
    if (newBreakpoint != _currentBreakpoint) {
      _currentBreakpoint = newBreakpoint;
      return true;
    }
    return false;
  }

  function onWindowResize() {
      if (breakpointChanged()) {
        window.range.resetPosition();
      }
  }

  window.range.initialize(Breakpoint.TABLET, window.sliderComparisons.showAfter);
  window.addEventListener('resize', window.debounce(onWindowResize, TIME_RESIZE_DEBOUNCE));
}())