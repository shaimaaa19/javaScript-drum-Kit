//drum kit
const createNode = (nodeType, options, children) => {
  const newElement = document.createElement(nodeType);
  if (options.className) {
    newElement.classList.add(options.className);
  }
  if (options.dataType) {
    newElement.dataset.key = options.dataType;
  }
  if (options.srcd) {
    newElement.src = options.srcd;
  }
  newElement.append(...children);
  return newElement;
};

const sounds = [
  { key: "A", sound: "clap", src: "sounds/clap.wav", code: "65" },
  { key: "S", sound: "hihat", src: "sounds/hihat.wav", code: "83" },
  { key: "D", sound: "kick", src: "sounds/kick.wav", code: "68" },
  { key: "F", sound: "openhat", src: "sounds/openhat.wav", code: "70" },
  { key: "G", sound: "boom", src: "sounds/boom.wav", code: "71" },
  { key: "H", sound: "ride", src: "sounds/ride.wav", code: "72" },
  { key: "J", sound: "snare", src: "sounds/snare.wav", code: "74" },
  { key: "K", sound: "tom", src: "sounds/tom.wav", code: "75" },
  { key: "L", sound: "tink", src: "sounds/tink.wav", code: "76" },
];

const root = document.querySelector("#root");
const keysContainer = createNode(
  "div",
  { className: "keys" },
  sounds.map((sound2) =>
    createNode("divs", { className: "key", dataType: sound2.code }, [
      createNode("kbd", {}, [sound2.key]),
      createNode("span", { className: "sound" }, [sound2.sound]),
      createNode("audio", { dataType: sound2.code, srcd: sound2.src }, []),
    ])
  )
);
root.append(keysContainer);

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`divs[data-key="${e.keyCode}"]`);
  if (!audio) return;
  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
