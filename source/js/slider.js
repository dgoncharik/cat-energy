var slider = document.querySelector('.comparisons');
var imgBefore = slider.querySelector('.comparisons__before-picture-wrapper');
var imgAfter = slider.querySelector('.comparisons__after-picture-wrapper');
var range = slider.querySelector('.comparisons__range');
var progress = range.querySelector('.comparisons__progress');
var toogle = range.querySelector('.comparisons__toggle');
var btnBefore = range.querySelector('.comparisons__btn--before');
var btnAfter = range.querySelector('.comparisons__btn--after');

var mobileWidth = 320;
var tabletWidth = 768;
var desktopWidth = 1300;
var windowWidth = document.body.clientWidth;

btnBefore.addEventListener('click', function(evt) {
  evt.preventDefault();
  imgAfter.style.width = '0%';
  toogle.style.left = '0%';
})

btnAfter.addEventListener('click', function(evt) {
  evt.preventDefault();
  var computedStyle = getComputedStyle(toogle);
  var toogleMarginLeft = computedStyle.marginLeft;
  var toogleMarginRight = computedStyle.marginRight;
  var toogleWidth = computedStyle.width;
  imgAfter.style.width = '100%';

  if (windowWidth < tabletWidth) {
    toogle.style.left = `calc(100% - (${toogleWidth} + ${toogleMarginLeft} + ${toogleMarginRight})`;
  } else {
    toogle.style.left = '100%';
  }
})

window.onresize = function(evt) {
  windowWidth = document.body.clientWidth;
    imgAfter.style = null;
    imgBefore.style = null;
    toogle.style = null;
};

toogle.addEventListener('mousedown', function(evt) {
  if (evt.which === 1) { // если клик левой кнопкой мыши
    var toogleX = toogle.getBoundingClientRect().left + pageXOffset;
    var progressX = progress.getBoundingClientRect().left + pageXOffset;
    var progressWidth = progress.offsetWidth;
    // var posLeft = toogle.offsetLeft;
    console.log(progressX, toogleX, progressWidth);

    window.onmousemove = function(evt) {
      toogle.style.transition = 'none';
      var newPos = evt.pageX;
      console.log(newPos)
      // toogle.style.left = newPos + 'px';

      return false;
    }
  }
})
