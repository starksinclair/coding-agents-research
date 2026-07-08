(function () {
  var PARTIAL = "partials/auth-modals.html";
  var formSelector =
    ".loginbox form, .loginbo form, .registerbox form, .registerbo form";
  var pendingModalId = null;

  window.openAuthModal = function (modalId) {
    function show() {
      var modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
      }
    }

    if (document.getElementById(modalId)) {
      show();
      return;
    }

    pendingModalId = modalId;
    document.addEventListener(
      "auth-modals:loaded",
      function () {
        if (pendingModalId === modalId) {
          show();
          pendingModalId = null;
        }
      },
      { once: true }
    );
  };

  window.closeAuthModal = function (modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  };

  function getAssetBase() {
    var script = document.currentScript;
    if (!script || !script.src) {
      return "";
    }
    var match = script.src.match(/^(.*\/)js\/auth-modals\.js(?:\?.*)?$/);
    return match ? match[1] : "";
  }

  function authModalRoot($el) {
    return $el.closest("#id01, #id02");
  }

  function bindModalToggles() {
    if (!window.jQuery) {
      return;
    }

    var $ = window.jQuery;

    $(document)
      .off("click.authModals", ".log")
      .on("click.authModals", ".log", function (e) {
        $(".loginbox").css("display", "none");
        $(".registerbox").css("display", "block");
        e.preventDefault();
      });

    $(document)
      .off("click.authModals", ".reg")
      .on("click.authModals", ".reg", function (e) {
        $(".loginbox").css("display", "block");
        $(".registerbox").css("display", "none");
        e.preventDefault();
      });

    $(document)
      .off("click.authModals", ".log1")
      .on("click.authModals", ".log1", function (e) {
        $(".loginbo").css("display", "none");
        $(".registerbo").css("display", "block");
        e.preventDefault();
      });

    $(document)
      .off("click.authModals", ".reg1")
      .on("click.authModals", ".reg1", function (e) {
        $(".loginbo").css("display", "block");
        $(".registerbo").css("display", "none");
        e.preventDefault();
      });

    $(document)
      .off("click.authModals", ".forgot")
      .on("click.authModals", ".forgot", function (e) {
        var $modal = authModalRoot($(this));
        $modal.find(".loginbox, .loginbo, .registerbox, .registerbo").css(
          "display",
          "none"
        );
        $modal.find(".forgotpas").css("display", "block");
        e.preventDefault();
      });

    $(document)
      .off("click.authModals", ".log2, .log3")
      .on("click.authModals", ".log2, .log3", function (e) {
        var $modal = authModalRoot($(this));
        $modal.find(".loginbox, .loginbo").css("display", "block");
        $modal.find(".registerbox, .registerbo, .forgotpas").css(
          "display",
          "none"
        );
        e.preventDefault();
      });

    $(formSelector).attr("novalidate", "novalidate");
  }

  function loadAuthModals() {
    var mount = document.getElementById("auth-modals-mount");
    if (!mount) {
      return;
    }

    var base = getAssetBase();
    var partialUrl = base + PARTIAL;

    fetch(partialUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to load auth modals from " + partialUrl);
        }
        return response.text();
      })
      .then(function (html) {
        mount.innerHTML = html.replace(/__BASE__/g, base);
        bindModalToggles();
        document.dispatchEvent(new CustomEvent("auth-modals:loaded"));
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  loadAuthModals();
})();
