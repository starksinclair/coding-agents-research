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

var carouselWriting1 = makeCarousel("mySlid4", "dem4");
var carouselWriting2 = makeCarousel("mySlid5", "dem5");
var carouselWriting3 = makeCarousel("mySlid6", "dem6");
var carouselWriting4 = makeCarousel("mySlid7", "dem7");

function plusDi4(n) { carouselWriting1.plus(n); }
function currentDi4(n) { carouselWriting1.current(n); }
function showDi4(n) { carouselWriting1.current(n); }

function plusDi5(n) { carouselWriting2.plus(n); }
function currentDi5(n) { carouselWriting2.current(n); }
function showDi5(n) { carouselWriting2.current(n); }

function plusDi6(n) { carouselWriting3.plus(n); }
function currentDi6(n) { carouselWriting3.current(n); }
function showDi6(n) { carouselWriting3.current(n); }

function plusDi7(n) { carouselWriting4.plus(n); }
function currentDi7(n) { carouselWriting4.current(n); }
function showDi7(n) { carouselWriting4.current(n); }


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