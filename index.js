const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// console.log(collisions); // 플레이어와 충돌하려고 하면 플레이어의 움직임을 멈출 것

canvas.width = 1120;
canvas.height = 640;

const collisionsMap = []; // 충돌 맵 배열
for (i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70)); // 가로가 70타일임. 한줄씩 잘라서 배열로 만들어줌
}

class Boundary {
  static width = 16;
  static height = 16;
  constructor({ position }) {
    this.position = position;
    this.width = 16;
    this.height = 16;
  }
  draw() {
    c.fillStyle = "rgba(0, 0, 0, 0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// 경계 const를 만들고 이를 배열과 동일하게 설정하는 것이 이치에 맞음
// 2D 배열을 통해 루프를 돔
const boundaries = [];

const offset = {
  x: 0,
  y: 0,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1429)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

// console.log(boundaries);
// 충돌 배열 내에 단일 값 2800개
// 우리가 원하는 타일 지도 내의 모든 단일 위치 내에 경계를 그려야함

// 충돌지점으로 그린 하트 이미지가 있는 곳에만 그리자.
// console.log(collisionsMap);

const image = new Image();
image.src = "./img/final_map.png";
// console.log(image);

const playerImage = new Image(256, 32);
playerImage.src = "./img/mom_down.png";

class Sprite {
  // 실제로 스프라이트를 생성할 때마다 해당 속성을 선언하려고 하는 곳
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
      // console.log(this.width);
      // console.log(this.height);
    };
  }
  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x, // sprite가 x축의 배치되는 위치를 결정
      this.position.y, // sprite가 x축의 배치되는 위치를 결정
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 256 / 2,
    y: canvas.height / 2 - 32 / 2,
  },
  image: playerImage,
  frames: {
    max: 8,
  },
});

// 새롭게 생성된 스프라이트  -> 이 배경 상수를 지도를 그리는 실제 배경과 연결하고 싶음
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
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

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});
// const movables = [player, ...boundaries];
const movables = [background, ...boundaries];

function rectangleCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width - 20 >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - 5 &&
    rectangle1.position.y + rectangle1.height - 5 >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height - 10
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  let moving = true;
  background.draw();

  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();
  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        rectangleCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 4,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y = movable.position.y + 4;
      });
    moving = true;
  } else if (keys.a.pressed && lastKey === "a") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        rectangleCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 4,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x = movable.position.x + 4;
      });
    moving = true;
  } else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        rectangleCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 4,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y = movable.position.y - 4;
      });
    moving = true;
  } else if (keys.d.pressed && lastKey === "d") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        rectangleCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 4,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x = movable.position.x - 4;
      });
    moving = true;
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
