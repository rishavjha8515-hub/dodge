// Simple "Dodge!" canvas game — single-file logic
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
});

// HUD
const scoreEl = document.getElementById('score');
const msgEl = document.getElementById('message');

// Player
const player = {
  w: 48,
  h: 12,
  x: W/2 - 24,
  y: H - 80,
  speed: 8,
  color: '#29d5ff'
};

// Input
const keys = { left:false, right:false };
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key.toLowerCase() === 'r' && state === 'gameover') start();
});
addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
});

// Touch input: move by touch x
let activeTouch = null;
canvas.addEventListener('touchstart', (e) => {
  activeTouch = e.touches[0].clientX;
});
canvas.addEventListener('touchmove', (e) => {
  activeTouch = e.touches[0].clientX;
});
canvas.addEventListener('touchend', () => activeTouch = null);

// Obstacles
let obstacles = [];
let spawnTimer = 0;
let spawnInterval = 60; // frames
let speedMultiplier = 1;
let frames = 0;

// Game state
let score = 0;
let state = 'menu'; // 'playing' | 'gameover'
start();

function start() {
  obstacles = [];
  spawnTimer = 0;
  spawnInterval = 60;
  speedMultiplier = 1;
  frames = 0;
  score = 0;
  state = 'playing';
  player.x = W/2 - player.w/2;
  player.y = H - 80;
  msgEl.textContent = 'Use ← → or touch to move. Press R to restart.';
}

function spawnObstacle(){
  const w = 24 + Math.random() * 48;
  const x = Math.random() * (W - w);
  obstacles.push({
    x, y: -20, w, h: 18 + Math.random()*20,
    vy: 2 + Math.random()*1.6
  });
}

function update(){
  if (state !== 'playing') return;
  frames++;
  // increase difficulty gradually
  if (frames % 600 === 0) speedMultiplier += 0.25;
  if (frames % 300 === 0 && spawnInterval > 20) spawnInterval -= 4;

  // input
  if (keys.left) player.x -= player.speed;
  if (keys.right) player.x += player.speed;
  if (activeTouch !== null){
    const targetX = activeTouch - player.w/2;
    player.x += (targetX - player.x) * 0.25;
  }
  // bounds
  player.x = Math.max(0, Math.min(W - player.w, player.x));

  // spawn
  spawnTimer++;
  if (spawnTimer >= spawnInterval){
    spawnTimer = 0;
    spawnObstacle();
  }

  // update obstacles
  for (let i = obstacles.length - 1; i >= 0; i--){
    const o = obstacles[i];
    o.y += o.vy * speedMultiplier;
    // remove offscreen and count as score
    if (o.y > H + 50){
      obstacles.splice(i,1);
      score += 1;
    } else {
      // collision
      if (rectIntersect(o.x,o.y,o.w,o.h, player.x, player.y, player.w, player.h)){
        gameOver();
      }
    }
  }

  scoreEl.textContent = `Score: ${score}`;
}

function rectIntersect(x1,y1,w1,h1,x2,y2,w2,h2){
  return !(x2 > x1 + w1 || x2 + w2 < x1 || y2 > y1 + h1 || y2 + h2 < y1);
}

function draw(){
  // clear
  ctx.fillStyle = '#071023';
  ctx.fillRect(0,0,W,H);

  // player
  ctx.fillStyle = player.color;
  roundRect(ctx, player.x, player.y, player.w, player.h, 6, true, false);

  // obstacles
  ctx.fillStyle = '#ff7b7b';
  for (const o of obstacles){
    roundRect(ctx, o.x, o.y, o.w, o.h, 6, true, false);
  }

  // subtle ground line
  ctx.fillStyle = 'rgba(255,255,255,0.03)';
  ctx.fillRect(0, H-60, W, 2);
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  if (typeof r === 'undefined') r = 5;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function gameOver(){
  state = 'gameover';
  msgEl.textContent = `Game Over — Score: ${score} — Press R to restart`;
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);