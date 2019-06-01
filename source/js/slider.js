let slider = document.querySelector('.comparisons');
let imgBefore = slider.querySelector('.comparisons__before-picture-wrapper');
let imgAfter = slider.querySelector('.comparisons__after-picture-wrapper');
let range = slider.querySelector('.comparisons__range');
let progress = range.querySelector('.comparisons__progress');
let tgl = range.querySelector('.comparisons__toggle');
let btnBefore = range.querySelector('.comparisons__btn--before');
let btnAfter = range.querySelector('.comparisons__btn--after');

let mobileWidth = 320;
let tabletWidth = 768;
let desktopWidth = 1300;
let windowWidth = document.body.clientWidth;

btnBefore.addEventListener('click', function(evt) {
  evt.preventDefault();
  imgAfter.style.width = '0%';
  tgl.style.left = '0%';
})

btnAfter.addEventListener('click', function(evt) {
  evt.preventDefault();
  let computedStyle = getComputedStyle(tgl);
  let tglMarginLeft = computedStyle.marginLeft;
  let tglMarginRight = computedStyle.marginRight;
  let tglWidth = computedStyle.width;
  imgAfter.style.width = '100%';

  if (windowWidth < tabletWidth) {
    tgl.style.left = `calc(100% - (${tglWidth} + ${tglMarginLeft} + ${tglMarginRight})`;
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

tgl.addEventListener('mousedown', function(evt) {
  let progressX = progress.getBoundingClientRect().left + pageXOffset;
  let tglX = tgl.getBoundingClientRect().left + pageXOffset;
  // console.log(tglX, progressX);

  window.onmousemove = function(evt) {
    tgl.style.transition = 'none';
    let cursorX = evt.clientX;
    let newPos = cursorX - progressX;
    console.log(newPos)
    tgl.style.left = newPos + 'px';
  }
})

// tgl.addEventListener('mousedown', function(evt) {
//   // if (evt.which === 1) {} // если клик левой кнопкой мыши

//   let tglX = tgl.getBoundingClientRect().left + pageXOffset;
//   let progressX = progress.offsetX;
//   let progressWidth = progress.offsetWidth;
//   // let posLeft = tgl.offsetLeft;
//   console.log(progressX);

//   window.onmousemove = function(evt) {
//     tgl.style.transition = 'none';
//     let newPos = evt.pageX;
//     // console.log(newPos)
//     // tgl.style.left = newPos + 'px';

//     return false;
//   }
// })
