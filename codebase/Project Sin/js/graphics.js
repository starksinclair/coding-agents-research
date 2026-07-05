var slideIndex = 1;
showDivs4(slideIndex);

function plusDivs4(n) {
  showDivs4((slideIndex += n));
}

function currentDiv4(n) {
  showDivs4((slideIndex = n));
}

function showDivs4(n) {
  var i;
  var x = document.getElementsByClassName("mySlides6");
  var dots = document.getElementsByClassName("demo4");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " w3-white";
}

//2ND SLIDER
var slideIndex = 1;
showDiv1(slideIndex);
function plusDiv1(n) {
  showDiv1((slideIndex += n));
}

function currentDivs1(n) {
  showDiv1((slideIndex = n));
}

function showDiv1(n) {
  var i;
  var x = document.getElementsByClassName("mySlide1");
  var dots = document.getElementsByClassName("demos1");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " w3-white";
}

//3RD SLIDER
var slideIndex = 1;
showDiv2(slideIndex);

function plusDiv2(n) {
  showDiv2((slideIndex += n));
}

function currentDivs2(n) {
  showDiv2((slideIndex = n));
}

function showDiv2(n) {
  var i;
  var x = document.getElementsByClassName("mySlide2");
  var dots = document.getElementsByClassName("demos2");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " w3-white";
}

//4TH SLIDER
var slideIndex = 1;
showDiv3(slideIndex);

function plusDiv3(n) {
  showDiv3((slideIndex += n));
}

function currentDivs3(n) {
  showDiv3((slideIndex = n));
}

function showDiv3(n) {
  var i;
  var x = document.getElementsByClassName("mySlide3");
  var dots = document.getElementsByClassName("demos3");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " w3-white";
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
