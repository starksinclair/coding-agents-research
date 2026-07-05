function w3_open() {
  document.getElementById('mySidebar').style.display = 'block';
  document.getElementById('myOverlay').style.display = 'block';
}
function w3_close() {
  document.getElementById('mySidebar').style.display = 'none';
  document.getElementById('myOverlay').style.display = 'none';
}

      //SLIDESHOW
// var slideIndex = 0;
// carousel();

// function carousel() {
//   var i;
//   var x = document.getElementsByClassName('mySlides');
// for (i = 0; i < x.length; i++) {
//   x[i].style.display = "none";
// }
// slideIndex++;
// if (slideIndex > x.length) {
//   slideIndex = 1
// }
// x[slideIndex-1].style.display = "block";
// setTimeout(carousel, 4000);
// }

//SETUP SCROLL
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    // console.log("helo");

    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
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


// var slideIndex = 1;
// showDivs(slideIndex);

// function plusDivs(n) {
//   showDivs(slideIndex += n);
// }

// function currentDivs(n) {
//   showDivs(slideIndex += n);
// }

// function showDivs(n) {
//   var i;
//   var x = 
//   document.getElementsByClassName('mySlides');
//   var dots = document.getElementsByClassName('demo');
//   if (n > x.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = x.length};
//   for(i = 0; i < x.length; i++){
//     x[i].style.display = 'none'
//   }
//   for(i = 0; i < dots.length; i++){
//     dots[i].classList.remove('w3-white');
//   }
//   x[slideIndex-1].style.display = 'block';
//   dots[slideIndex-1].classList.add('w3-white')
// }






























$(document).ready(function () {
  $('.modal1').hide()
  $('.modal2').hide()
  $('.modal3').hide()
  $('.sign').click(function () {
    $('.modal3').hide()
    $('.modal1').fadeIn(500)
  })
})








// $(document).ready(function(){
//   $('.register').hide()
//   $('.password').hide()
//   $('.log').click(function(){
//     $('.login').hide();
//     $('.password').hide()
//     $('.register').fadeIn(500)
//   })
//   $('.reg').click(function(){
//     $('.register').hide();
//     $('.password').hide()
//     $('.login').fadeIn(500)
//   })
//   $('.pas').click(function(){
//     $('.register').hide();
//     $('.login').hide();
//     $('.password').fadeIn(500)
//   })
// })


// function myFunction(id){
//   var x = document.getElementById(id);
//   if (x.className.indexOf("w3-show") == -1) {
//     x.className += " w3-show"
//   }else{
//     x.className = x.className.replace(" w3-show", "")
//   }
// }
// let companies =`[
//   {
//     "name": "Big Corporation",
//     "numberOfEmployees": 10000,
//     "CEO": "Sin",
//     "Rating": 3.5
//   },
//   {
//     "name": "Small Startup",
//     "numberOfEmployees": 3,
//     "CEO": null,
//     "Rating": 4.3
//   }
// ]`
// console.log(JSON.parse(companies))
// var MenuItems = document.getElementById('MenuItems');

// 		MenuItems.style.maxHeight = "0px";

// 		function menutoggle(){
// 			if (MenuItems.style.maxHeight == "0px") {

// 					MenuItems.style.maxHeight = "300px"
// 			}
// 			else{
// 					 MenuItems.style.maxHeight = "0px"
// 			}
// 		}