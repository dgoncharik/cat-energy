var mainNav = document.querySelector('.main-nav');
var toogle = mainNav.querySelector('.main-nav__toogle-menu');

mainNav.classList.remove('main-nav--no-js');

toogle.addEventListener('click', function(evt) {
  mainNav.classList.toggle('main-nav--opened')
})
