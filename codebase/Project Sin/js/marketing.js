
//1ST SLIDER

var slideIndex = 1;
 showDi(slideIndex);
 
 function plusDi(n) {
   showDi(slideIndex += n);
 }
 
 function currentDiv7(n) {
   showDi(slideIndex = n);
 }
 
 function showDi(n) {
   var i;
   var x = document.getElementsByClassName("mySlid");
   var dots = document.getElementsByClassName("dem");
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
 showDi1(slideIndex);
 
 function plusDi1(n) {
   showDi1(slideIndex += n);
 }
 
 function currentDi1(n) {
   showDi1(slideIndex = n);
 }
 
 function showDi1(n) {
   var i;
   var x = document.getElementsByClassName("mySlid1");
   var dots = document.getElementsByClassName("dem1")
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
 showDi2(slideIndex);
 
 function plusDi2(n) {
   showDi2(slideIndex += n);
 }
 
 function currentDi2(n) {
   showDi2(slideIndex = n);
 }
 
 function showDi2(n) {
   var i;
   var x = document.getElementsByClassName("mySlid2");
   var dots = document.getElementsByClassName("dem2")
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
 showDi3(slideIndex);
 
 function plusDi3(n) {
   showDi3(slideIndex += n);
 }
 
 function currentDi3(n) {
   showDi3(slideIndex = n);
 }
 
 function showDi3(n) {
   var i;
   var x = document.getElementsByClassName("mySlid3");
   var dots = document.getElementsByClassName("dem3")
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
