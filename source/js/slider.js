var slider = document.querySelector('.comparisons');
var imgBefore = slider.querySelector('.comparisons__before-picture-wrapper');
var imgAfter = slider.querySelector('.comparisons__after-picture-wrapper');
var range = slider.querySelector('.comparisons__range');
var toogle = range.querySelector('.comparisons__toggle');
var btnBefore = range.querySelector('.comparisons__btn--before');
var btnAfter = range.querySelector('.comparisons__btn--after');

var mobileWidth = 320;
var tabletWidth = 768;
var desktopWidth = 1300;
var windowWidth = document.body.clientWidth;

var getStyle = function (e, styleName) {
  var styleValue = "";
  if(document.defaultView && document.defaultView.getComputedStyle) {
      styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
  }
  else if(e.currentStyle) {
      styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
          return p1.toUpperCase();
      });
      styleValue = e.currentStyle[styleName];
  }
  return styleValue;
}

console.log('ccccc', getStyle(range, 'width'))

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

window.onresize = function(event) {
  windowWidth = document.body.clientWidth;
    imgAfter.style = null;
    imgBefore.style = null;
    toogle.style = null;
};
