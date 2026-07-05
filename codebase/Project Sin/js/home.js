function openSlideMenu() {
  document.getElementById("side-menu").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeSlideMenu() {
  document.getElementById("side-menu").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function myAccFunc() {
  var x = document.getElementById("demoAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-light-cyan";
  } else {
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-light-cyan", "");
  }
}

function mySelFunc() {
  var x = document.getElementById("demoDrop3");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-light-cyan";
  } else {
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-light-cyan", "");
  }
}

function myDevFunc() {
  var x = document.getElementById("demoDrop2");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-light-cyan";
  } else {
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-light-cyan", "");
  }
}

function myBudFunc() {
  var x = document.getElementById("demoDrop1");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-light-cyan";
  } else {
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-light-cyan", "");
  }
}

function mySerFunc() {
  var x = document.getElementById("demoDrop");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-light-cyan";
  } else {
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-light-cyan", "");
  }
}

//SETUP NAVBAR
const navbar = document.getElementById("nav");
const navbar2 = document.getElementById("nav2");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  if (scrollHeight > navHeight) {
    navbar2.classList.add("fixed-nav2");
  } else {
    navbar2.classList.remove("fixed-nav2");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    // console.log("helo");

    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

//MYSLIDESHOW HOME PAGE
var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("myslideshow");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 4000);
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

// $(function () {
//   $('.cls').on('click', function(e){
//     $('.ido1').hide();

//     e.preventDefault()
//   })
// })

//FOR MARKETING
