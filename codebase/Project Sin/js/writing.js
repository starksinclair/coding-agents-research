//1ST SLIDER
var slideIndex = 1;
showDi4(slideIndex);

function plusDi4(n) {
  showDi4(slideIndex += n);
}

function currentDi4(n) {
  showDi4(slideIndex = n);
}

function showDi4(n) {
  var i;
  var x = document.getElementsByClassName("mySlid4");
  var dots = document.getElementsByClassName("dem4")
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

//2ND SLIDE
var slideIndex = 1;
showDi5(slideIndex);

function plusDi5(n) {
  showDi5(slideIndex += n);
}

function currentDi5(n) {
  showDi5(slideIndex = n);
}

function showDi5(n) {
  var i;
  var x = document.getElementsByClassName("mySlid5");
  var dots = document.getElementsByClassName("dem5")
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

var slideIndex = 1;
showDi6(slideIndex);

function plusDi6(n) {
  showDi6(slideIndex += n);
}

function currentDi6(n) {
  showDi6(slideIndex = n);
}

function showDi6(n) {
  var i;
  var x = document.getElementsByClassName("mySlid6");
  var dots = document.getElementsByClassName("dem6")
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
showDi7(slideIndex);

function plusDi7(n) {
  showDi7(slideIndex += n);
}

function currentDi7(n) {
  showDi7(slideIndex = n);
}

function showDi7(n) {
  var i;
  var x = document.getElementsByClassName("mySlid7");
  var dots = document.getElementsByClassName("dem7")
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