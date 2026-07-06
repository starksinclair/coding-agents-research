var carouselWriting1 = createCarousel("mySlid4", "dem4");
var carouselWriting2 = createCarousel("mySlid5", "dem5");
var carouselWriting3 = createCarousel("mySlid6", "dem6");
var carouselWriting4 = createCarousel("mySlid7", "dem7");

function plusDi4(n) {
  carouselWriting1.plus(n);
}
function currentDi4(n) {
  carouselWriting1.current(n);
}
function showDi4(n) {
  carouselWriting1.current(n);
}

function plusDi5(n) {
  carouselWriting2.plus(n);
}
function currentDi5(n) {
  carouselWriting2.current(n);
}
function showDi5(n) {
  carouselWriting2.current(n);
}

function plusDi6(n) {
  carouselWriting3.plus(n);
}
function currentDi6(n) {
  carouselWriting3.current(n);
}
function showDi6(n) {
  carouselWriting3.current(n);
}

function plusDi7(n) {
  carouselWriting4.plus(n);
}
function currentDi7(n) {
  carouselWriting4.current(n);
}
function showDi7(n) {
  carouselWriting4.current(n);
}

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
