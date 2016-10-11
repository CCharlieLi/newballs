let canvas;
let ctx;
let cx = 100;
let cy = 100;
let vx = 2;
let vy = 5;
let radius = 20;
let gravity = 0.2;
let damping = 0.9;
let traction = 0.8;
let paused = false;

const init = () => {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;
  circle();
};

function circle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!paused) {
    requestAnimationFrame(circle);
  }

  if (cx + radius >= canvas.width) {
    vx = -vx * damping;
    cx = canvas.width - radius;
  } else if (cx - radius <= 0) {
    vx = -vx * damping;
    cx = radius;
  }
  if (cy + radius >= canvas.height) {
    vy = -vy * damping;
    cy = canvas.height - radius;
    // traction here
    vx *= traction;
  } else if (cy - radius <= 0) {
    vy = -vy * damping;
    cy = radius;
  }

  //vy += gravity; // <--- this is it

  cx += vx;
  cy += vy;

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'red';
  ctx.fill();
}

init();

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(e) {
  cx = e.pageX - canvas.offsetLeft;
  cy = e.pageY - canvas.offsetTop;
  vx = vy = 0;
  paused = true;
}

function handleMouseUp(e) {
  vx = e.pageX - canvas.offsetLeft - cx;
  vy = e.pageY - canvas.offsetTop - cy;
  paused = false;
  circle();
}