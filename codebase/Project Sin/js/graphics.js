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

var carouselGraphics1 = makeCarousel("mySlides6", "demo4");
var carouselGraphics2 = makeCarousel("mySlide1", "demos1");
var carouselGraphics3 = makeCarousel("mySlide2", "demos2");
var carouselGraphics4 = makeCarousel("mySlide3", "demos3");

function plusDivs4(n) { carouselGraphics1.plus(n); }
function currentDiv4(n) { carouselGraphics1.current(n); }
function showDivs4(n) { carouselGraphics1.current(n); }

function plusDiv1(n) { carouselGraphics2.plus(n); }
function currentDivs1(n) { carouselGraphics2.current(n); }
function showDiv1(n) { carouselGraphics2.current(n); }

function plusDiv2(n) { carouselGraphics3.plus(n); }
function currentDivs2(n) { carouselGraphics3.current(n); }
function showDiv2(n) { carouselGraphics3.current(n); }

function plusDiv3(n) { carouselGraphics4.plus(n); }
function currentDivs3(n) { carouselGraphics4.current(n); }
function showDiv3(n) { carouselGraphics4.current(n); }

// FOR HIDE/SHOW FORM
$(function () {
  $(".log").on("click", function (e) {
    $(".loginbox").css("display", "none");
    $(".registerbox").css("display", "block");
    e.preventDefault();
  });
});

$(function () {
  $(".reg").on("click", function (e) {
    $(".loginbox").css("display", "block");
    $(".registerbox").css("display", "none");
    e.preventDefault();
  });
});

$(function () {
  $(".log1").on("click", function (e) {
    $(".loginbo").css("display", "none");
    $(".registerbo").css("display", "block");
    e.preventDefault();
  });
});

$(function () {
  $(".reg1").on("click", function (e) {
    $(".loginbo").css("display", "block");
    $(".registerbo").css("display", "none");
    e.preventDefault();
  });
});

$(function () {
  $(".forgot").on("click", function (e) {
    $(".loginbo").css("display", "none");
    $(".registerbo").css("display", "none");
    $(".forgotpas").css("display", "block");
    e.preventDefault();
  });
});

$(function () {
  $(".log2").on("click", function (e) {
    $(".loginbo").css("display", "block");
    $(".registerbo").css("display", "none");
    $(".forgotpas").css("display", "none");
    e.preventDefault();
  });
});

$(function () {
  $(".forgot").on("click", function (e) {
    $(".loginbox").css("display", "none");
    $(".registerbox").css("display", "none");
    $(".forgotpas").css("display", "block");
    e.preventDefault();
  });
});

$(function () {
  $(".log3").on("click", function (e) {
    $(".loginbox").css("display", "block");
    $(".registerbox").css("display", "none");
    $(".forgotpas").css("display", "none");
    e.preventDefault();
  });
});
