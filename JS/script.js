const popupModal = document.querySelector(".popup");
const popupOverlay = document.querySelector(".pop-overlay");
const game = document.querySelector(".game");
const playButton = document.querySelector(".game .card-wrapper .play");
const cardWrapper = document.querySelector(".game .cardContainer");
const infoIcon = document.querySelector(".info.icon");
const scoreWrapper = document.querySelector(".game .scoreWrapper");
const score = document.querySelector(".game .scoreItem .score");
const body = document.querySelector(".body");
const gameImages = document.querySelectorAll(
  ".body-wrapper .img-container .img-wrapper"
);
const arrows = document.querySelectorAll(".game .body .arrow");
const pauseButton = document.querySelector(".game .pause.icon");
const iconsArr = [...arrows, pauseButton];
const scoreElement = document.querySelector(".scoreWrapper .score");
const successModal = document.querySelector(".success-wrapper");
const closeButton = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
const soundButton = document.querySelector(".game .sound.icon");
let counter = 0;
let soundOn = true;
const animateInfo = () => {
  infoIcon.classList.add("show");
  infoIcon.addEventListener("animationend", () => {
    setTimeout(() => {
      infoIcon.classList.remove("show");
      infoIcon.classList.add("hide");
    }, 1000);
  });
};
infoIcon.addEventListener("click", () => {
  infoIcon.classList.remove("hide");
  animateInfo();
});
playButton.addEventListener("click", () => {
  document.querySelector("#start-audio").play();
  cardWrapper.classList.add("hide");
  cardWrapper.addEventListener("animationend", () => {
    cardWrapper.classList.remove("hide");
    cardWrapper.style.visibility = "hidden";
    scoreWrapper.style.visibility = "visible";
    score.textContent = `0/${gameImages.length}`;
    game.style.backgroundImage = "url('../media/images/gameBackground.svg')";
    body.classList.add("show");
  });
});
gameImages.forEach((image) => {
  image.addEventListener("click", () => {
    document.querySelector(`audio[id="${image.dataset.id}"]`).play();
    image.classList.add("clicked");
    image.addEventListener("animationend", () => {
      image.classList.remove("clicked");
    });
    if (!image.classList.contains("colored")) {
      image.classList.add("colored");
      counter += 1;
    }
    const text = image.querySelector(".card-text");
    text.classList.add("show");
    text.addEventListener("animationend", () => {
      text.classList.remove("show");
    });
    scoreElement.textContent = `${counter}/${gameImages.length}`;
    document
      .querySelector(":root")
      .style.setProperty("--width", `${(100 / gameImages.length) * counter}%`);
    if (counter === gameImages.length) {
      const text = document.querySelector(".text-card .score-text");
      text.textContent = `${counter}/${gameImages.length}`;
      successModal.style.visibility = "visible";
      overlay.classList.add("show");
      successModal.classList.add("show");
      setTimeout(() => {
        document.querySelector(`audio[id="success"]`).play();
      }, 500);
    }
  });
});
successModal.addEventListener("animationend", () => {
  successModal.classList.remove("show");
  successModal.classList.remove("hide");
});
const addCloseAnimation = () => {
  closeButton.classList.add("animate");
  closeButton.addEventListener("animationend", () => {
    closeButton.classList.remove("animate");
  });
  successModal.classList.add("hide");
  successModal.style.visibility = "hidden";
  overlay.classList.remove("show");
  const link = document.querySelector(".link-address").textContent;
  window.location.href = link;
};
document.addEventListener("click", function (event) {
  const isVisible =
    window.getComputedStyle(successModal).visibility === "visible";
  var isClickInside =
    successModal.contains(event.target) || event.target === closeButton;
  if (!isClickInside && isVisible) {
    addCloseAnimation();
  }
});
closeButton.addEventListener("click", () => {
  addCloseAnimation();
});
const hideItems = () => {
  iconsArr.forEach((item) => {
    item.style.opacity = 0;
  });
};
let timer;
const resetTimer = () => {
  clearTimeout(timer);
  iconsArr.forEach((item) => {
    item.style.opacity = 1;
  });
  timer = setTimeout(hideItems, 3000);
};
document.addEventListener("mousemove", resetTimer);
document.addEventListener("touchstart", resetTimer);
const checkScreen = () => {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const isMobile = window.innerWidth < 768 && isPortrait;
  return isMobile;
};
window.addEventListener("load", () => {
  const is_mobile = checkScreen();
  if (is_mobile) {
    popupModal.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
  } else {
    game.style.visibility = "visible";
  }
  animateInfo();
});
soundButton.addEventListener("click", () => {
  const onIcon = soundButton.querySelector(".fa-solid:not(.off)");
  const offIcon = soundButton.querySelector(".off");
  onIcon.classList.add("off");
  offIcon.classList.remove("off");
  if (soundOn) {
    soundOn = false;
    document.querySelectorAll("audio").forEach((audio) => {
      audio.muted = true;
    });
  } else {
    soundOn = true;
    document.querySelectorAll("audio").forEach((audio) => {
      audio.muted = false;
    });
  }
});
document.addEventListener("contextmenu", function (event) {
  var target = event.target;
  if (target.tagName === "IMG") {
    event.preventDefault();
  }
  return false;
});
window.addEventListener("orientationchange", function () {
  const is_mobile = checkScreen();
  if (window.orientation === 90 || window.orientation === -90) {
    if (is_mobile) {
      game.style.visibility = "visible";
      popupModal.style.visibility = "hidden";
      popupOverlay.style.visibility = "hidden";
    } else {
      popupModal.style.visibility = "visible";
      popupOverlay.style.visibility = "visible";
    }
  } else {
    popupModal.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
  }
});
