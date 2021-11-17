"use strict";

const loading_section = document.querySelector(".loading-section");
const menu_section = document.querySelector(".menu-section");
const game_screen = document.querySelector(".game-screen");
const back_to_menu = document.querySelector(".back-btn");

const action_btn = document.querySelector(".action-btn");
const footer = document.querySelector("footer");
const playBtn = document.querySelector("#playBtn");
const instructionBtn = document.querySelector("#instBtn");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalClsBtn = document.querySelector("#modalClsBtn");
const modal_header = document.querySelector(".modal-body h2");
const modal_body = document.querySelector(".modal-body p:nth-of-type(2)");

const bg_svg = document.querySelector(".bg-svg svg path");
const svgPath = bg_svg.getAttribute("d");
const newSvgPath =
  "M-41.164 -21.6351C-316.764 -21.6351 10.6667 987.505 -0.499985 1029.67V1082.5H1919L1969.5 1071.5C1941.33 977.499 2050.89 -40.5746 1943.69 -40.5746C1809.69 -40.5746 1782.69 -74.6655 1443.69 -74.6655C1104.69 -74.6655 932.808 -142.848 655.808 -142.848C378.808 -142.848 303.336 -21.6351 -41.164 -21.6351Z";
const modal_h2 = "Instructions";
const modal_paragraph = `Roll the dice to get score. When the dice face has one you lost the
round and the current score will get reset. Use hold point to store
the current points. 100 points to win the game.`;

//game const and var
const dice_p1 = document.querySelector("#dice-p0");
const dice_p2 = document.querySelector("#dice-p1");

const player1 = document.querySelector("#player-0");
const player2 = document.querySelector("#player-1");
const score_p1 = document.querySelector("#score-0");
const score_p2 = document.querySelector("#score-1");
const curr_score_p1 = document.querySelector("#curr_score_0");
const curr_score_p2 = document.querySelector("#curr_score_1");

const btn_new = document.querySelector(".btn-new");
const btn_roll = document.querySelector(".btn-roll");
const btn_hold = document.querySelector(".btn-hold");

let playing = true;
let scores = [0, 0];
let current_score = 0;
let active_player = 0;
let active_dice;

window.onload = () => {
  setTimeout(() => {
    bg_svg.setAttribute("d", newSvgPath);
    bg_svg.style.cssText = `transition: all 2.3s ease 0.3s;`;
    loading_section.style.cssText = `animation: circleClip 1.598s ease-out forwards;`;
  }, 3000);

  setTimeout(() => {
    loading_section.classList.add("hide");
  }, 4500);

  setTimeout(() => {
    menu_section.classList.remove("hide");
    footer.classList.remove("hide");
  }, 4500);
};

playBtn.addEventListener("click", () => {
  game_screen.classList.remove("hide");
  menu_section.classList.add("hide");
});

instructionBtn.addEventListener("click", () => {
  modal.classList.add("show");
  overlay.classList.remove("hide");
  action_btn.style.cssText = `visibility: hidden`;
});

modalClsBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  overlay.classList.add("hide");
  action_btn.style.cssText = `visibility: visible`;
});

back_to_menu.addEventListener("click", () => {
  menu_section.classList.remove("hide");
  game_screen.classList.add("hide");

  modal_header.textContent = modal_h2;
  modal_body.textContent = modal_paragraph;
});

// Rolling dice

btn_roll.addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    active_dice = document.getElementById(`dice-p${active_player}`);
    active_dice.src = `dice_png/Dice-${dice}.png`;

    if (dice != 1) {
      current_score += dice;
      document.getElementById(`curr_score_${active_player}`).textContent =
        current_score;
    } else {
      document.getElementById(`curr_score_${active_player}`).textContent = 0;
      document
        .getElementById(`player-${active_player}`)
        .classList.toggle("non-active-player");

      active_player = active_player === 0 ? 1 : 0;
      current_score = 0;

      document
        .getElementById(`player-${active_player}`)
        .classList.toggle("non-active-player");
    }
  }
});

btn_hold.addEventListener("click", () => {
  if (playing) {
    scores[active_player] += current_score;
    current_score = 0;

    document.getElementById(`score-${active_player}`).textContent =
      scores[active_player];

    if (scores[active_player] >= 100) {
      winner();
    }
  }
});

btn_new.addEventListener("click", () => {
  scores = [0, 0];
  current_score = 0;
  active_player = 0;
  curr_score_p1.textContent = 0;
  curr_score_p2.textContent = 0;
  score_p1.textContent = 0;
  score_p2.textContent = 0;
  dice_p1.src = "dice_png/Dice-1.png";
  dice_p2.src = "dice_png/Dice-2.png";
  player1.classList.remove("non-active-player");
  player2.classList.add("non-active-player");
  playing = true;
});

function winner() {
  playing = false;
  modal.classList.add("show");
  overlay.classList.remove("hide");
  modal_header.textContent = "We Have a Winner!!! 🎉🎉";

  modal_body.textContent = `Player-${
    active_player + 1
  } won the game... Pat your back Player-${active_player + 1}`;
}
