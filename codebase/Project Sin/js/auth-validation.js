(function ($) {
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getOrCreateErrorEl($input) {
    var $error = $input.next(".field-error");
    if (!$error.length) {
      $error = $('<div class="field-error" role="alert"></div>');
      $input.after($error);
    }
    return $error;
  }

  function setFieldError($input, message) {
    getOrCreateErrorEl($input).text(message);
    $input.addClass("is-invalid");
  }

  function clearFieldError($input) {
    $input.next(".field-error").text("");
    $input.removeClass("is-invalid");
  }

  function validateEmail($input) {
    var value = $.trim($input.val());
    if (!value) {
      setFieldError($input, "Email is required.");
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setFieldError($input, "Please enter a valid email address.");
      return false;
    }
    clearFieldError($input);
    return true;
  }

  function validatePassword($input) {
    var value = $input.val();
    if (!value || !$.trim(value)) {
      setFieldError($input, "Password is required.");
      return false;
    }
    clearFieldError($input);
    return true;
  }

  function isLoginForm($form) {
    return $form.closest(".loginbox, .loginbo").length > 0;
  }

  function validateForm($form) {
    var valid = true;
    var $email = $form.find('input[type="text"], input[type="email"]').first();
    var $password = $form.find('input[type="password"]').first();

    if (!validateEmail($email)) {
      valid = false;
    }

    if (isLoginForm($form) && $password.length) {
      if (!validatePassword($password)) {
        valid = false;
      }
    }

    return valid;
  }

  $(function () {
    var formSelector =
      ".loginbox form, .loginbo form, .registerbox form, .registerbo form";

    $(formSelector).attr("novalidate", "novalidate");

    $(document).on("submit", formSelector, function (e) {
      if (!validateForm($(this))) {
        e.preventDefault();
      }
    });

    $(document).on(
      "input",
      ".loginbox input, .loginbo input, .registerbox input, .registerbo input",
      function () {
        clearFieldError($(this));
      }
    );
  });
})(jQuery);
