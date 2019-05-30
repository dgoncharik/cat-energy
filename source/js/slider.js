var slider = document.querySelector('.comparisons');
var imgBefore = slider.querySelector('.comparisons__before-picture-wrapper');
var imgAfter = slider.querySelector('.comparisons__after-picture-wrapper');
var range = slider.querySelector('.comparisons__range');
var toogle = range.querySelector('.comparisons__toggle');
var btnBefore = range.querySelector('.comparisons__btn--before');
var btnAfter = range.querySelector('.comparisons__btn--after');

var mobileWidth = 320;
var windowWidth = document.body.clientWidth;

var startingTooglePosition = '0%';
var endTooglePosition = '45%';

// var getStyle = function (e, styleName) {
//   var styleValue = "";
//   if(document.defaultView && document.defaultView.getComputedStyle) {
//       styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
//   }
//   else if(e.currentStyle) {
//       styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
//           return p1.toUpperCase();
//       });
//       styleValue = e.currentStyle[styleName];
//   }
//   return styleValue;
// }

console.log(toogle.offsetWidth)

btnBefore.addEventListener('click', function(evt) {
  evt.preventDefault();
  console.log('before');
  imgAfter.style.width = '0%';
  toogle.style.left = '0%';
})

btnAfter.addEventListener('click', function(evt) {
  evt.preventDefault();
  var computedStyle = getComputedStyle(toogle);
  var toogleMarginLeft = computedStyle.marginLeft;
  var toogleMarginRight = computedStyle.marginRight;
  var toogleWidth = computedStyle.width;
  // var toogleWidth = toogle.offsetWidth;
  console.log('after');
  imgAfter.style.width = '100%';
  toogle.style.left = `calc(100% - (${toogleWidth} + ${toogleMarginLeft} + ${toogleMarginRight})`;
  // toogle.style.left = `calc(100% - ${toogleWidth}px)`;
  console.log(Number(toogleWidth))
  console.log(`calc(100% - ${toogleWidth + toogleMarginLeft + toogleMarginRight})`)
})

window.onresize = function(event) {
  windowWidth = document.body.clientWidth;
  console.log(windowWidth)

  if (windowWidth > mobileWidth) {
    console.log('bingo!!')
  }
};
