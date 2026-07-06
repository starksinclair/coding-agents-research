var carouselWeb1 = createCarousel("mySlides1", "demo");
var carouselWeb2 = createCarousel("mySlides3", "demo1");
var carouselWeb3 = createCarousel("mySlides4", "demo2");
var carouselWeb4 = createCarousel("mySlides5", "demo3");

function plusDivs(n) {
  carouselWeb1.plus(n);
}
function currentDiv(n) {
  carouselWeb1.current(n);
}

function plusDivs1(n) {
  carouselWeb2.plus(n);
}
function currentDiv1(n) {
  carouselWeb2.current(n);
}

function plusDivs2(n) {
  carouselWeb3.plus(n);
}
function currentDiv2(n) {
  carouselWeb3.current(n);
}

function plusDivs3(n) {
  carouselWeb4.plus(n);
}
function currentDiv3(n) {
  carouselWeb4.current(n);
}
