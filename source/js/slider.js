var slider = document.querySelector('.comparisons');
var imgBefore = slider.querySelector('.comparisons__before-picture-wrapper');
var imgAfter = slider.querySelector('.comparisons__after-picture-wrapper');
var range = slider.querySelector('.comparisons__range');
var toogle = range.querySelector('.comparisons__toggle');
var btnBefore = range.querySelector('.comparisons__btn--before');
var btnAfter = range.querySelector('.comparisons__btn--after');

var startingTooglePosition = '0%';
var endTooglePosition = '45%';

btnBefore.addEventListener('click', function(evt) {
  evt.preventDefault();
  console.log('before');
  imgAfter.style.width = '0%';
})

btnAfter.addEventListener('click', function(evt) {
  evt.preventDefault();
  console.log('after');
  imgAfter.style.width = '100%';
})

console.log(slider, imgBefore, imgAfter, range, toogle, btnBefore, btnAfter);
