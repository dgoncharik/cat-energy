'use strict';

(function() {
  var mainNavElement = document.querySelector('.main-nav');
  var toogleElement = mainNavElement.querySelector('.main-nav__toogle-menu');

  function initialization() {
    mainNavElement.classList.remove('main-nav--no-js');
  }
  
  toogleElement.addEventListener('click', function(evt) {
    evt.preventDefault();
    mainNavElement.classList.toggle('main-nav--opened');
  })

  initialization();
}())
