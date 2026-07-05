//1ST SLIDER


var slideIndex = 1;
showDi8(slideIndex);

function plusDi8(n) {
  showDi8(slideIndex += n);
}

function currentDi8(n) {
  showDi8(slideIndex = n);
}

function showDi8(n) {
  var i;
  var x = document.getElementsByClassName("mySlid8");
  var dots = document.getElementsByClassName("dem9")
  ;
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}


//2ND SLIDER
var slideIndex = 1;
showD1(slideIndex);

function plusD1(n) {
  showD1(slideIndex += n);
}

function currentD1(n) {
  showD1(slideIndex = n);
}

function showD1(n) {
  var i;
  var x = document.getElementsByClassName("mySli1");
  var dots = document.getElementsByClassName("de1")
  ;
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}

//3RD SLIDER
var slideIndex = 1;
showDi0(slideIndex);

function plusDi0(n) {
  showDi0(slideIndex += n);
}

function currentDi0(n) {
  showDi0(slideIndex = n);
}

function showDi0(n) {
  var i;
  var x = document.getElementsByClassName("mySlid0");
  var dots = document.getElementsByClassName("dem0")
  ;
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}


//4TH SLIDER
var slideIndex = 1;
showDi11(slideIndex);

function plusDi11(n) {
  showDi11(slideIndex += n);
}

function currentDi11(n) {
  showDi11(slideIndex = n);
}

function showDi11(n) {
  var i;
  var x = document.getElementsByClassName("mySlid11");
  var dots = document.getElementsByClassName("dem11")
  ;
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
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