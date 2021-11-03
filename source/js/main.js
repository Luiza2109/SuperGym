"use strict";

(function () {
  const fitnessRoom = document.querySelector(".fitness-room__video");
  const fitnessRoomPlug = fitnessRoom.querySelector(".fitness-room__video > div");
  const fitnessRoomVideo = fitnessRoom.querySelector(".fitness-room__video > video");
  const fitnessRoomVideoBtn = fitnessRoom.querySelector(".fitness-room__video-btn");

  fitnessRoom.classList.add("fitness-room__video--disabled");

  if (fitnessRoom.classList.contains("fitness-room__video--disabled")) {
    fitnessRoomVideo.removeAttribute("controls");
  }

  const showVideo = function () {
    fitnessRoomVideoBtn.classList.add("hidden");
    fitnessRoomPlug.classList.add("hidden");

    fitnessRoomVideo.setAttribute("controls", "true");
    fitnessRoomVideo.removeAttribute("poster");
    fitnessRoomVideo.play();
  };

  fitnessRoomVideoBtn.addEventListener("click", function() {
    showVideo();
  });
})();

"use strict";

(function () {
  const mySwiper = new Swiper(".trainers-slider", {
    loop: true,
    speed: 900,
    navigation: {
      nextEl: ".trainers-slider__button--next",
      prevEl: ".trainers-slider__button--prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 40
      }
    }
  });

  const swiper = new Swiper(".reviews-slider", {
    loop: true,
    speed: 900,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".reviews-slider__button--next",
      prevEl: ".reviews-slider__button--prev",
    }
  });
})();

"use strict";

(function () {
  const form = document.querySelector(".feedback-form");
  const formFileds = form.elements;
  const submitBtn = form.querySelector(".feedback-form__btn");
  const telInput = form.querySelector("input[name='tel']");

  const changeHandler = function () {
    localStorage.setItem(this.name, this.value);
  };

  const attachEvents = function () {
    for (let i = 0; i < formFileds.length; i++) {
      formFileds[i].addEventListener("change", changeHandler);
    }
  };

  const checkStorage = function () {
    for (let i = 0; i < formFileds.length; i++) {
      if (formFileds[i].type !== "submit") {
        formFileds[i].value = localStorage.getItem(formFileds[i].name);
      }
    }

    attachEvents();
  };

  checkStorage();

  const clearStorage = function () {
    localStorage.clear();
  };

  const checkEmptyField = function () {
    let valueLength = Number (telInput.value.length);

    if(valueLength < 18) {
      telInput.setCustomValidity("Номер телефона должен состоять из 11 цифр");
    } else {
      telInput.setCustomValidity("");
    }
  };

  form.addEventListener("input", function() {
    checkEmptyField();
  });

  submitBtn.addEventListener("click", function() {
    clearStorage();
  });
})();

"use strict";

(function () {
  const phoneInputs = document.querySelectorAll("input[data-tel-input]");

  const getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, "");
  }

  const onPhonePaste = function (evt) {
    let input = evt.target,
        inputNumbersValue = getInputNumbersValue(input);

    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
          input.value = inputNumbersValue;
          return;
        }
    }
  }

  const onPhoneInput = function (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;

      let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";

      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    }

    input.value = formattedInputValue;
  }

  const onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
  }

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }
})();
