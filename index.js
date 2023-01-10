//Creates constants for adding new chats
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  ["Valentin", "./pictures/goldenknight.jpg", "Ich bin tot ☠️"],
  ["Volk", "./pictures/v.png", "Wir sind uns alle einig. Gretchen war das "],
  ["Volk", "./pictures/v.png", "🐐"],
  [
    "Messi",
    "./pictures/Brand_Protection_FIFA-World-Cup-Official-Trophy-P4.webp",
    "La literatura alemana es genial",
  ],
  ["Gretchen", "./pictures/gretchen.jpg", "Wo ist Faust hin? ❓"],
  ["Marthe", "./pictures/marthe.jpg", "Oh nein"],
];

//The Person sending message is Faust
const PERSON_IMG = "././pictures/faust.png";
const PERSON_NAME = "Faust";

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse();
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const botmsg = BOT_MSGS[r];
  const msgText = botmsg[2];
  //Millisekunden
  const delay = 1000;
  const BOT_NAME = botmsg[0];
  const BOT_IMG = botmsg[1];
  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
