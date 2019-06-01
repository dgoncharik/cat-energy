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
  var tglStyle = getComputedStyle(tgl);
  imgAfter.style.width = '100%';

  if (windowWidth < tabletWidth) {
    tgl.style.left = 'calc(100% - (' + tglStyle.width + ' + ' + tglStyle.marginLeft + ' + ' + tglStyle.marginRight + '))'
  } else {
    tgl.style.left = '100%';
  }
})

window.onresize = function(evt) {
  windowWidth = document.body.clientWidth;
    imgAfter.style = null;
    imgBefore.style = null;
    tgl.style = null;
};

function changeSlide (evt) {
  evt.preventDefault();
  var type = evt.type;
  if (type == 'mousemove' && evt.which != 1) return false;
  var progressWidth = progress.offsetWidth;
  var progressX = progress.getBoundingClientRect().left + pageXOffset;
  var cursorX = evt.clientX;
  if (type === 'touchmove') {cursorX = evt.changedTouches[0].pageX}
  var newPos = cursorX - progressX;

  if (windowWidth < tabletWidth) {
    var tglStyle = getComputedStyle(tgl);
    var progressStyle = getComputedStyle(progress);
    var left = {
      cur: tglStyle.left,
      min: '0px',
      max: progress.offsetWidth - (onlyNumbers(tglStyle.width) + 
                                  onlyNumbers(tglStyle.marginLeft) + 
                                  onlyNumbers(tglStyle.marginRight) + 
                                  onlyNumbers(progressStyle.borderLeftWidth) + 
                                  onlyNumbers(progressStyle.borderRightWidth)) + 'px'
    }

    if (cursorX > prevCursorX + 10 && left.cur === left.min) {
      tgl.style.left = left.max
      imgAfter.style.width = '100%';
    } else if (cursorX < prevCursorX - 10 && left.cur === left.max) {
        tgl.style.left = left.min
        imgAfter.style.width = '0%';
      }
    
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

function stopChangeSlide(evt) {
  document.removeEventListener('mousemove', changeSlide);
  tgl.style.transition = null;
  imgAfter.style.transition = null;
  imgBefore.style.transition = null;
}

tgl.addEventListener('touchstart', function(evt) {
  this.addEventListener('touchmove', changeSlide);
})

var prevCursorX = null;
tgl.addEventListener('mousedown', function(evt) {
  prevCursorX = evt.clientX;
  document.addEventListener('mousemove', changeSlide);
  document.addEventListener('mouseup', stopChangeSlide);
})