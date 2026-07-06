var carouselVideo1 = createCarousel("mySlid8", "dem9");
var carouselVideo2 = createCarousel("mySli1", "de1");
var carouselVideo3 = createCarousel("mySlid0", "dem0");
var carouselVideo4 = createCarousel("mySlid11", "dem11");

function plusDi8(n) {
  carouselVideo1.plus(n);
}
function currentDi8(n) {
  carouselVideo1.current(n);
}
function showDi8(n) {
  carouselVideo1.current(n);
}

function plusD1(n) {
  carouselVideo2.plus(n);
}
function currentD1(n) {
  carouselVideo2.current(n);
}
function showD1(n) {
  carouselVideo2.current(n);
}

function plusDi0(n) {
  carouselVideo3.plus(n);
}
function currentDi0(n) {
  carouselVideo3.current(n);
}
function showDi0(n) {
  carouselVideo3.current(n);
}

function plusDi11(n) {
  carouselVideo4.plus(n);
}
function currentDi11(n) {
  carouselVideo4.current(n);
}
function showDi11(n) {
  carouselVideo4.current(n);
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
