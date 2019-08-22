'use strict';

(function() {
  var rangeElement = document.querySelector('.comparisons__range');
  var progressElement = rangeElement.querySelector('.comparisons__progress');
  var toogleElement = progressElement.querySelector('.comparisons__toggle');
  var btnMinElement = rangeElement.querySelector('.comparisons__btn--before');
  var btnMaxElement = rangeElement.querySelector('.comparisons__btn--after');
  var LEFT_BUTTON_MOUSE_CODE = 1;
  var _breakpointForBigVersion = null;
  var _startCursor = null;
  var _changePositionCallback = null;

  function initialize(breakpointForBigVersion, fn) {
    _breakpointForBigVersion = breakpointForBigVersion;
    _changePositionCallback = fn;
  }

  function resetPositionToogle() {
    moveToogle(getDefaultPosition());
  }

  function moveStartPositionToogle() {
    moveToogle(0);
  }

  function moveEndPositionToogle() {
    moveToogle(getMaxPosition());
  }

  function convertToPercent(position) {
    return Math.round(position / getMaxPosition() * 100);
  }

  function isSmallVersion() {
    return window.innerWidth < _breakpointForBigVersion;
  }

  function getMaxPosition() {
    var maxPosition = progressElement.offsetWidth;
    if (isSmallVersion()) {
      maxPosition = progressElement.offsetWidth - 
                    toogleElement.offsetWidth - 
                    window.utils.getNumericalValue(getComputedStyle(toogleElement).marginLeft) -
                    window.utils.getNumericalValue(getComputedStyle(toogleElement).marginRight) -
                    window.utils.getNumericalValue(getComputedStyle(progressElement).borderLeft) -
                    window.utils.getNumericalValue(getComputedStyle(progressElement).borderRight);
    }
    return maxPosition;
  }

  function getDefaultPosition(){
    return isSmallVersion() ? 0 : getMaxPosition() / 2;
  }

  function isValidPosition(newPosition) {
    return newPosition >= 0 && newPosition <= getMaxPosition();
  }

  function fixPosition(position) {
    if (position < 0) {
      position = 0;
    } else if (position > getMaxPosition()) {
      position = getMaxPosition();
    }
    return position;
  }

  function moveToogle(newPositionX) {
    toogleElement.style.left = newPositionX === '' ? '' : newPositionX + 'px';
    if (_changePositionCallback) {
      _changePositionCallback(convertToPercent(newPositionX))
    }
  }

  function interactionMethod(evt) {
    return evt.type.startsWith('mouse') || evt.type == 'click' ? 'mouse' : 'touch';
  }

  function getCurrentCursorX(evt) {
    return interactionMethod(evt) == 'mouse' ? evt.clientX : evt.changedTouches[0].clientX;
  }

  function onToogleElementMouseDown(downEvt) {
    downEvt.preventDefault();
    if (interactionMethod(downEvt) == 'mouse') {
      if (downEvt.which != LEFT_BUTTON_MOUSE_CODE) return false;
      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    } else {
        document.addEventListener('touchmove', onDocumentMouseMove, {passive: false});
        document.addEventListener('touchend', onDocumentMouseUp, {passive: false});
    }
    _startCursor = getCurrentCursorX(downEvt);
    toogleElement.style.transition = 'none';
  }

  function onDocumentMouseMove(moveEvt) {
    moveEvt.preventDefault();
    var newPosition = (toogleElement.offsetLeft - window.utils.getNumericalValue(getComputedStyle(toogleElement).marginLeft)) - (_startCursor - getCurrentCursorX(moveEvt));
    if (isValidPosition(newPosition)) {
      moveToogle(newPosition);
      _startCursor = getCurrentCursorX(moveEvt);
    } else {
        moveToogle(fixPosition(newPosition));
        _startCursor = window.utils.getCoords(toogleElement).left + toogleElement.offsetWidth / 2;
    }
  }

  function onDocumentMouseUp(evt) {
    evt.preventDefault();
    toogleElement.style.transition = '';
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
    document.removeEventListener('touchmove', onDocumentMouseMove);
    document.removeEventListener('touchend', onDocumentMouseUp);
  }

  function onProgressElementClick(evt) {
    if (!isSmallVersion()) return false;
    var touchCoordX = getCurrentCursorX(evt);
    var firsHalf = progressElement.offsetWidth / 2;
    var selectedFirstHalf = touchCoordX - evt.currentTarget.offsetLeft < firsHalf;
    if (evt.target === evt.currentTarget) {
      selectedFirstHalf ? moveStartPositionToogle() : moveEndPositionToogle();
    }
  }

  btnMinElement.addEventListener('click', function(evt) {
    evt.preventDefault();
    moveStartPositionToogle();
  })

  btnMaxElement.addEventListener('click', function(evt) {
    evt.preventDefault();
    moveEndPositionToogle();
  })

  progressElement.addEventListener('click', onProgressElementClick);
  toogleElement.addEventListener('mousedown', onToogleElementMouseDown);
  toogleElement.addEventListener('touchstart', onToogleElementMouseDown, {passive: false});
  
  window.range = {
    initialize: initialize,
    resetPosition: resetPositionToogle
  };
}())