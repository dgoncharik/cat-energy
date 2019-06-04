var slider = document.querySelector('.comparisons');
var imgBefore = slider.querySelector('.comparisons__before-picture-wrapper');
var imgAfter = slider.querySelector('.comparisons__after-picture-wrapper');
var range = slider.querySelector('.comparisons__range');
var progress = range.querySelector('.comparisons__progress');
var tgl = range.querySelector('.comparisons__toggle');
var btnBefore = range.querySelector('.comparisons__btn--before');
var btnAfter = range.querySelector('.comparisons__btn--after');

var mobileWidth = 320;
var tabletWidth = 768;
var desktopWidth = 1300;
var windowWidth = document.body.clientWidth;

function onlyNumbers(str) {
  return Number(str.replace(/\D+/g,""))
}

btnBefore.addEventListener('click', function(evt) {
  evt.preventDefault();
  imgAfter.style.width = '0%';
  tgl.style.left = '0%';
})

btnAfter.addEventListener('click', function(evt) {
  evt.preventDefault();
  var tglComputedStyle = getComputedStyle(tgl);
  imgAfter.style.width = '100%';

  if (windowWidth < tabletWidth) {
    tgl.style.left = 'calc(100% - (' + tglComputedStyle.width + ' + ' + tglComputedStyle.marginLeft + ' + ' + tglComputedStyle.marginRight + '))';
  } else {
    tgl.style.left = '100%';
  }
})

window.addEventListener('resize', function(evt) {
  windowWidth = document.body.clientWidth;
  imgAfter.style.width = '';
  imgBefore.style.width = '';
  tgl.style.left = '';
})

function move (evt) {
  evt.preventDefault();
  if (evt.type == 'mousemove' && evt.which != 1) return false;
  var progressWidth = progress.offsetWidth;
  var progressX = progress.getBoundingClientRect().left + pageXOffset;
  var cursorX = evt.type === 'mousemove' ? evt.pageX : cursorX = evt.changedTouches[0].pageX;
  var newPos = cursorX - progressX;
  function moveMobile() {
    var tglComputedStyle = getComputedStyle(tgl);
    var progressComputedStyle = getComputedStyle(progress);
    var tglPosition = {
      current: tglComputedStyle.left,
      start: '0px',
      end: progress.offsetWidth - (onlyNumbers(tglComputedStyle.width) +
                                  onlyNumbers(tglComputedStyle.marginLeft) +
                                  onlyNumbers(tglComputedStyle.marginRight) +
                                  onlyNumbers(progressComputedStyle.borderLeftWidth) +
                                  onlyNumbers(progressComputedStyle.borderRightWidth)) + 'px'
    }

    if (cursorX > prevCursorX + 1 && tglPosition.current === tglPosition.start) {
      tgl.style.left = tglPosition.end;
      imgAfter.style.width = '100%';
    } else if (cursorX < prevCursorX - 1 && tglPosition.current === tglPosition.end) {
        tgl.style.left = tglPosition.start;
        imgAfter.style.width = '0%';
      }
  }

  if (windowWidth < tabletWidth) {
    moveMobile()
  } else {
      tgl.style.transition = 'none';
      imgAfter.style.transition = 'none';
      imgBefore.style.transition = 'none';
      if (newPos < 0) newPos = 0;
      if (newPos > progressWidth) newPos = progressWidth;
      tgl.style.left = newPos + 'px';
      imgAfter.style.width = (newPos / progressWidth * 100) + '%';
  }

  return false;
}

function stopMove(evt) {
  document.removeEventListener('mousemove', move);
  tgl.removeEventListener('touchmove', move);
  tgl.style.transition = '';
  imgAfter.style.transition = '';
  imgBefore.style.transition = '';
}

var prevCursorX = null;
tgl.addEventListener('touchstart', function(evt) {
  prevCursorX = cursorX = evt.changedTouches[0].pageX;
  this.addEventListener('touchmove', move);
  this.addEventListener('touchend', stopMove);
})

tgl.addEventListener('mousedown', function(evt) {
  prevCursorX = evt.clientX;
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', stopMove);
})
