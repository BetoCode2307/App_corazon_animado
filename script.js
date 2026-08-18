const fechaCumple = new Date("2027-04-19T00:00:00").getTime();
const countdownElement = document.getElementById("countdown");

const updateTimer = setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = fechaCumple - ahora;

  if (diferencia <= 0) {
    clearInterval(updateTimer);
    countdownElement.innerHTML = "¡FELIZ CUMPLEAÑOS!";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

countdownElement.innerHTML = dias + " dias " + horas + "h " + minutos + "m " + segundos + "s";
}, 1000);

// 2. Dibujar arbol de corazones en Canvas
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 250;

// Tronco del arbol
ctx.fillStyle = "#8d6e63";
ctx.beginPath();
ctx.moveTo(190, 250);
ctx.lineTo(210, 250);
ctx.lineTo(205, 140);
ctx.lineTo(195, 140);
ctx.closePath();
ctx.fill();

function drawHeart(x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
  ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
  ctx.fill();
  ctx.restore();
}

const colors = ['#e91e63', '#ec407a', '#f48fb1', '#d81b60', '#ff4081', '#c2185b'];

for (let i = 0; i < 200; i++) {
  let angle = Math.random() * Math.PI * 2;
  let r = Math.sqrt(Math.random()) * 65; 
  let x = 200 + r * Math.cos(angle);
  let y = 90 + r * Math.sin(angle);
  let size = Math.random() * 8 + 6;
  let color = colors[Math.floor(Math.random() * colors.length)];
  
  drawHeart(x, y, size, color);
}