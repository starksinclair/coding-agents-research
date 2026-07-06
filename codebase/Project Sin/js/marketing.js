var carouselMarketing1 = createCarousel("mySlid", "dem");
var carouselMarketing2 = createCarousel("mySlid1", "dem1");
var carouselMarketing3 = createCarousel("mySlid2", "dem2");
var carouselMarketing4 = createCarousel("mySlid3", "dem3");

function plusDi(n) {
  carouselMarketing1.plus(n);
}
function currentDiv7(n) {
  carouselMarketing1.current(n);
}
function showDi(n) {
  carouselMarketing1.current(n);
}

function plusDi1(n) {
  carouselMarketing2.plus(n);
}
function currentDi1(n) {
  carouselMarketing2.current(n);
}
function showDi1(n) {
  carouselMarketing2.current(n);
}

function plusDi2(n) {
  carouselMarketing3.plus(n);
}
function currentDi2(n) {
  carouselMarketing3.current(n);
}
function showDi2(n) {
  carouselMarketing3.current(n);
}

function plusDi3(n) {
  carouselMarketing4.plus(n);
}
function currentDi3(n) {
  carouselMarketing4.current(n);
}
function showDi3(n) {
  carouselMarketing4.current(n);
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
