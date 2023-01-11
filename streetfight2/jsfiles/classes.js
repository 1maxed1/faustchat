class Sprite {
  constructor({ position, imageSrc }) {
    //This references the obj --> Here Sprite
    //Position is an object containing x and y coordinates
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
  }
  //Draws out shape etc of the sprite
  draw() {
    //draws a new image to the canvas background
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.draw();
  }
}

class Fighter {
  constructor({ position, name, velocity, color = "red", offset }) {
    //This references the obj --> Here Sprite
    //Position is an object containing x and y coordinates
    this.position = position;
    //For state checks
    this.name = name;
    //Velocity to determine the direction the sprite is moving
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    //100 Hp at the start
    this.health = 100;
    this.dead = false;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //Attack box
    //Only when spacebar pressed

    if (this.isAttacking) {
      c.fillStyle = "white";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    if (this.name === "Faust" && this.health <= 100) {
      this.heal();
    }
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    //Gets bigger every time
    this.position.y += this.velocity.y;

    // gravity function
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  takeHit() {
    this.health -= 20;
  }
  heal() {
    this.health = 100;
    const hbplayer = document.getElementById("playerHealth");
    hbplayer.style.width = this.health + "%";
  }
}
