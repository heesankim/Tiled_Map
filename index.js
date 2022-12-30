const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

console.log(collisions); // 플레이어와 충돌하려고 하면 플레이어의 움직임을 멈출 것

canvas.width = 1120;
canvas.height = 640;

const image = new Image();
image.src = "./img/final_map.png";
console.log(image);

const playerImage = new Image(256, 32);
playerImage.src = "./img/mom_down.png";

class Sprite {
  // 실제로 스프라이트를 생성할 때마다 해당 속성을 선언하려고 하는 곳
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
// 새롭게 생성된 스프라이트  -> 이 배경 상수를 지도를 그리는 실제 배경과 연결하고 싶음
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: image,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 8,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 8,
    playerImage.height
  );
  if (keys.w.pressed && lastKey === "w") {
    background.position.y = background.position.y + 3;
  } else if (keys.a.pressed && lastKey === "a") {
    background.position.x = background.position.x + 3;
  } else if (keys.s.pressed && lastKey === "s") {
    background.position.y = background.position.y - 3;
  } else if (keys.d.pressed && lastKey === "d") {
    background.position.x = background.position.x - 3;
  }
}

animate();

let lastKey = "";

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
