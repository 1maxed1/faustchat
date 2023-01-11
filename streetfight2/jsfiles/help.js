const rectangularCollision = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
};

const determineWinner = ({ player, enemy, timerId }) => {
  const displayText = document.getElementById("displayText");

  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (player.health === enemy.health) {
    //tötet Valentin damit Faust gewinnt
    enemy.health = 0;
  } else if (player.health > enemy.health) {
    displayText.innerHTML = "Faust gewinnt!";
    //unnecassary
  } else if (player.health < enemy.health) {
    displayText.style.innerHTML = "Faust gewinnt!";
  }
};

let timer = 10;
let timerId;
const decreaseTimer = () => {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
};
