const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 960;

console.log("로드완료");

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

class Boundary {
  static width = 16;
  static height = 16;
  constructor(position) {
    this.position = position;
    this.width = 16;
    this.height = 16;
  }
  draw() {
    // fillRect 4개의 인자. (x의 위치, y의 위치, 너비,높이)
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];
const offset = {
  x: 0,
  y: -200,
};

// 충돌 맵 내의 각 행에 대해 화살표 함수 호출
collisionsMap.forEach((row, i) => {
  // 각 기호를 반복하는 각 행에 대해 동일한 작업 수행하려면 두번째 인자기입
  row.forEach((symbol, j) => {
    // 우리는 2d 배열을 통해 루프를 돌고 있으므로 각 항목에 대해
    // 현재 반복하고 있는 기호가 4444(하트)인 경우 에만 경계를 통과하려고함
    if (symbol === 4444)
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

// 화면에 무언가를 그리는 함수
const image = new Image();
image.src = "./img/MAD-ang-Map.png";

const playerImage = new Image();
playerImage.src = "./img/mom1_walk_down.png";

// onload image

// let backgroundImageX = 0;
// let playerImageX = 0;
// 지저분함 클래스 쓰자

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
    // 생성자 함수 내에서 스프라이트 클래스 내의 속성을 선언
  }
  // Sprite의 새 인스턴스를 생성할 때마다 이 생성자 함수와
  // 여기에 있는 모든 코드들을 자동으로 호출한다
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  // 위치 또는 속성을 가진 객체
  position: { x: offset.x, y: offset.y },
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
  // requestAnimationFrame()을 이용해서 무한 반복
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  c.drawImage(
    // 자르기 위치와 너비 및 높이 설정
    playerImage,
    0,
    0,
    playerImage.width / 8,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 - 150, // 플레이어의 x위치
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 8,
    playerImage.height
  );
  if (keys.w.pressed && lastKey === "w")
    background.position.y = background.position.y + 3;
  else if (keys.a.pressed && lastKey === "a")
    background.position.x = background.position.x + 3;
  else if (keys.s.pressed && lastKey === "s")
    background.position.y = background.position.y - 3;
  else if (keys.d.pressed && lastKey === "d")
    background.position.x = background.position.x - 3;
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
