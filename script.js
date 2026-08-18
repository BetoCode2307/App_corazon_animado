// 1. Configuración de la Fecha y Transición de Mensaje
const fechaCumple = new Date("2027-04-19T00:00:00").getTime();
const countdownElement = document.getElementById("countdown");

const updateTimer = setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = fechaCumple - ahora;

  if (diferencia <= 0) {
    clearInterval(updateTimer);
    // Cambiamos el contenedor completo para limpiar el texto "Esperando tu cumple..."
    const contenedorReloj = countdownElement.parentElement;
    contenedorReloj.innerHTML = "<h2 style='color: #e91e63; font-size: 1.8rem; animation: pulse 1.5s infinite;'>¡FELIZ CUMPLEAÑOS! ❤️🎉</h2>";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${dias} días ${horas}h ${minutos}m ${segundos}s`;
}, 1000);

// 2. Renderizado del Árbol en Canvas
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 250;

// Tronco
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

// 3. Animación de Pétalos/Corazones Cayendo
const fallingHearts = [];
for (let i = 0; i < 15; i++) {
  fallingHearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 4,
    speedY: Math.random() * 1 + 0.5,
    speedX: Math.sin(Math.random() * Math.PI) * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function animateFallingHearts() {
  // Limpia solo el área de caída sin borrar el árbol estático
  fallingHearts.forEach(heart => {
    heart.y += heart.speedY;
    heart.x += heart.speedX;

    if (heart.y > canvas.height) {
      heart.y = -10;
      heart.x = Math.random() * canvas.width;
    }

    drawHeart(heart.x, heart.y, heart.size, heart.color);
  });

  requestAnimationFrame(animateFallingHearts);
}

animateFallingHearts();