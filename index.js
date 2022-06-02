const palette = document.getElementById("palette");
const alertBox = document.getElementById("alertBox");
const alertMsg = document.getElementById("alertMsg");
const alertCode = document.getElementById("alertCode");

const NODE_COUNT = 80;
const ALERT_TEXT = ["I got food", "Say it i am yours", "Lemme smash", "We did it", "Your penis"];
const ALERT_ANIMATION_DURATION = 700;

function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getHexColor() {
  return `#${[rand(0, 255).toString(16), rand(0, 255).toString(16), rand(0, 255).toString(16)]
    .map((value) => (value.length > 1 ? value : `0${value}`))
    .join("")}`;
}

function showAlertBox(thisArg) {
  alertBox.classList.remove("hidden");
  alertBox.style.backgroundColor = thisArg.value;
  alertMsg.innerText = ALERT_TEXT[rand(0, ALERT_TEXT.length - 1)];
  alertCode.innerText = thisArg.value;
  setTimeout(() => alertBox.classList.add("hidden"), ALERT_ANIMATION_DURATION);
}

function copyHexColor() {
  navigator.clipboard.writeText(this.value);
  showAlertBox(this);
}

function appendChilds(parent, childs) {
  childs.forEach((child) => {
    parent.appendChild(child);
  });
}

function createColor(nbr) {
  const colors = [];

  for (let i = 0; i < nbr; i++) {
    const hexColor = getHexColor();

    const div = document.createElement("div");
    div.classList.add("color");
    div.style.backgroundColor = hexColor;

    const button = document.createElement("button");
    button.innerText = "Copy";
    button.classList.add("copy");
    button.setAttribute("value", hexColor);
    button.addEventListener("click", copyHexColor);

    div.appendChild(button);
    colors.push(div);
  }

  return colors;
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 50) {
    appendChilds(palette, createColor(NODE_COUNT));
  }
});

appendChilds(palette, createColor(NODE_COUNT));
