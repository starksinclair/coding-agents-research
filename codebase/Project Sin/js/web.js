//WEB DEVELOPMENT
function makeCarousel(slideClass, dotClass) {
  var index = 1;

  function show(n) {
    var slides = document.getElementsByClassName(slideClass);
    var dots = document.getElementsByClassName(dotClass);
    if (!slides.length) return;
    if (n > slides.length) { index = 1; }
    else if (n < 1) { index = slides.length; }
    else { index = n; }
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (var j = 0; j < dots.length; j++) {
      dots[j].className = dots[j].className.replace(" w3-white", "");
    }
    slides[index - 1].style.display = "block";
    if (dots[index - 1]) {
      dots[index - 1].className += " w3-white";
    }
  }

  show(index);
  return {
    plus: function (n) { show(index + n); },
    current: function (n) { show(n); }
  };
}

var carouselWeb1 = makeCarousel("mySlides3", "demo1");
var carouselWeb2 = makeCarousel("mySlides1", "demo");
var carouselWeb3 = makeCarousel("mySlides4", "demo2");
var carouselWeb4 = makeCarousel("mySlides5", "demo3");

function plusDivs1(n) { carouselWeb1.plus(n); }
function currentDiv1(n) { carouselWeb1.current(n); }
function showDivs1(n) { carouselWeb1.current(n); }

function plusDivs(n) { carouselWeb2.plus(n); }
function currentDiv(n) { carouselWeb2.current(n); }
function showDivs(n) { carouselWeb2.current(n); }

function plusDivs2(n) { carouselWeb3.plus(n); }
function currentDiv2(n) { carouselWeb3.current(n); }
function showDivs2(n) { carouselWeb3.current(n); }

function plusDivs3(n) { carouselWeb4.plus(n); }
function currentDiv3(n) { carouselWeb4.current(n); }
function showDivs3(n) { carouselWeb4.current(n); }


// FOR HIDE/SHOW FORM
$(function () {
  $('.log').on('click', function(e){
    $('.loginbox').css('display', 'none');
    $('.registerbox').css('display', 'block');
    e.preventDefault()
  })
})

$(function () {
  $('.reg').on('click', function(e){
    $('.loginbox').css('display', 'block');
    $('.registerbox').css('display', 'none');
    e.preventDefault()
  })
})

$(function () {
  $('.log1').on('click', function(e){
    $('.loginbo').css('display', 'none');
    $('.registerbo').css('display', 'block');
    e.preventDefault()
  })
})

$(function () {
  $('.reg1').on('click', function(e){
    $('.loginbo').css('display', 'block');
    $('.registerbo').css('display', 'none');
    e.preventDefault()
  })
})
 
$(function () {
  $('.forgot').on('click', function(e){
    $('.loginbo').css('display', 'none');
    $('.registerbo').css('display', 'none');
    $('.forgotpas').css('display', 'block');
    e.preventDefault()
  })
})

$(function () {
  $('.log2').on('click', function(e){
    $('.loginbo').css('display', 'block');
    $('.registerbo').css('display', 'none');
    $('.forgotpas').css('display', 'none');
    e.preventDefault()
  })
})

$(function () {
  $('.forgot').on('click', function(e){
    $('.loginbox').css('display', 'none');
    $('.registerbox').css('display', 'none');
    $('.forgotpas').css('display', 'block');
    e.preventDefault()
  })
})

$(function () {
  $('.log3').on('click', function(e){
    $('.loginbox').css('display', 'block');
    $('.registerbox').css('display', 'none');
    $('.forgotpas').css('display', 'none');
    e.preventDefault()
  })
})