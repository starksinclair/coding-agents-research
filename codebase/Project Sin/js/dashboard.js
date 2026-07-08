function openSlideMenu() {
  document.getElementById("side-menu").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeSlideMenu() {
  document.getElementById("side-menu").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// TOOGLE LIKE AND DISLIKE
function opencolor() {
  document.getElementById("thumb-up").style.color = "hsla(182, 63%, 54%)";
  document.getElementById("thumb-down").style.color = "gray";
}

function closecolor() {
  document.getElementById("thumb-up").style.color = "gray";
  document.getElementById("thumb-down").style.color = "hsla(182, 63%, 54%)";
}

function opencolor1() {
  document.getElementById("thumb-up1").style.color = "hsla(182, 63%, 54%)";
  document.getElementById("thumb-down1").style.color = "gray";
}

function closecolor1() {
  document.getElementById("thumb-up1").style.color = "gray";
  document.getElementById("thumb-down1").style.color = "hsla(182, 63%, 54%)";
}

function opencolor2() {
  document.getElementById("thumb-up2").style.color = "hsla(182, 63%, 54%)";
  document.getElementById("thumb-down2").style.color = "gray";
}

function closecolor2() {
  document.getElementById("thumb-up2").style.color = "gray";
  document.getElementById("thumb-down2").style.color = "hsla(182, 63%, 54%)";
}

function opencolor3() {
  document.getElementById("thumb-up3").style.color = "hsla(182, 63%, 54%)";
  document.getElementById("thumb-down3").style.color = "gray";
}

function closecolor3() {
  document.getElementById("thumb-up3").style.color = "gray";
  document.getElementById("thumb-down3").style.color = "hsla(182, 63%, 54%)";
}

//TOOGLE ACTIVE

const aot1 = document.getElementById("aot");
const over1 = document.getElementById("over");
const com1 = document.getElementById("com");
const rev2 = document.getElementById("rev");

function com() {
  document.getElementById("com").style.color = "hsla(182, 63%, 54%)";
  document.getElementById("over").style.color = "black";
  document.getElementById("aot").style.color = "black";
  document.getElementById("rev").style.color = "black";
  com1.classList.add("bt-nav");
  over1.classList.remove("bt-nav");
  aot1.classList.remove("bt-nav");
  rev2.classList.remove("bt-nav");
}

function aot() {
  document.getElementById("aot").style.color = "hsla(182, 63%, 54%)";
  aot1.classList.add("bt-nav");
  over1.classList.remove("bt-nav");
  com1.classList.remove("bt-nav");
  rev2.classList.remove("bt-nav");
  document.getElementById("over").style.color = "black";
  document.getElementById("com").style.color = "black";
  document.getElementById("rev").style.color = "black";
}

function over() {
  document.getElementById("over").style.color = "hsla(182, 63%, 54%)";
  document.getElementById("com").style.color = "black";
  document.getElementById("aot").style.color = "black";
  document.getElementById("rev").style.color = "black";
  over1.classList.add("bt-nav");
  aot1.classList.remove("bt-nav");
  com1.classList.remove("bt-nav");
  rev2.classList.remove("bt-nav");
}

function rev1() {
  document.getElementById("rev").style.color = "hsla(182, 63%, 54%)";
  rev2.classList.add("bt-nav");
  over1.classList.remove("bt-nav");
  com1.classList.remove("bt-nav");
  aot1.classList.remove("bt-nav");
  document.getElementById("com").style.color = "black";
  document.getElementById("aot").style.color = "black";
  document.getElementById("over").style.color = "black";
}

const navbar = document.getElementById("nav");
const navbar2 = document.getElementById("nav2");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  // if (scrollHeight > navHeight) {
  //   navbar.classList.add("fixed-nav");
  // } else {
  //   navbar.classList.remove("fixed-nav");
  // }
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
