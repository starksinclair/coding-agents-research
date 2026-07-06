var carouselGraphics1 = createCarousel("mySlides6", "demo4");
var carouselGraphics2 = createCarousel("mySlide1", "demos1");
var carouselGraphics3 = createCarousel("mySlide2", "demos2");
var carouselGraphics4 = createCarousel("mySlide3", "demos3");

function plusDivs4(n) {
  carouselGraphics1.plus(n);
}
function currentDiv4(n) {
  carouselGraphics1.current(n);
}
function showDivs4(n) {
  carouselGraphics1.current(n);
}

function plusDiv1(n) {
  carouselGraphics2.plus(n);
}
function currentDivs1(n) {
  carouselGraphics2.current(n);
}
function showDiv1(n) {
  carouselGraphics2.current(n);
}

function plusDiv2(n) {
  carouselGraphics3.plus(n);
}
function currentDivs2(n) {
  carouselGraphics3.current(n);
}
function currentDiv2(n) {
  carouselGraphics3.current(n);
}
function showDiv2(n) {
  carouselGraphics3.current(n);
}

function plusDiv3(n) {
  carouselGraphics4.plus(n);
}
function currentDivs3(n) {
  carouselGraphics4.current(n);
}
function showDiv3(n) {
  carouselGraphics4.current(n);
}

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
