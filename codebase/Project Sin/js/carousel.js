function createCarousel(slideClass, dotClass, activeDotClass) {
  var index = 1;
  var activeClass = activeDotClass || " w3-white";

  function show(n) {
    var slides = document.getElementsByClassName(slideClass);
    var dots = document.getElementsByClassName(dotClass);
    if (!slides.length) return;
    if (n > slides.length) {
      index = 1;
    } else if (n < 1) {
      index = slides.length;
    } else {
      index = n;
    }
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (var j = 0; j < dots.length; j++) {
      dots[j].className = dots[j].className.replace(activeClass, "");
    }
    slides[index - 1].style.display = "block";
    if (dots[index - 1]) {
      dots[index - 1].className += activeClass;
    }
  }

  show(index);
  return {
    plus: function (n) {
      show(index + n);
    },
    current: function (n) {
      show(n);
    },
  };
}
