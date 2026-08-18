// 1. Temporizador y Cuenta Regresiva
const fechaCumple = new Date("2027-04-19T00:00:00").getTime();
const countdownElement = document.getElementById("countdown");

const updateTimer = setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = fechaCumple - ahora;

  if (diferencia <= 0) {
    clearInterval(updateTimer);
    const contenedorReloj = countdownElement.parentElement;
    contenedorReloj.innerHTML = "<h2 style='color: #e91e63; font-size: 1.8rem;'>¡FELIZ CUMPLEAÑOS! ❤️🎉</h2>";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${dias} días ${horas}h ${minutos}m ${segundos}s`;
}, 1000);

// 2. Configuración del Canvas y Árbol
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 250;

const colors = ['#e91e63', '#ec407a', '#f48fb1', '#d81b60', '#ff4081', '#c2185b'];

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

const staticTreeHearts = [];
for (let i = 0; i < 200; i++) {
  let angle = Math.random() * Math.PI * 2;
  let r = Math.sqrt(Math.random()) * 65; 
  staticTreeHearts.push({
    x: 200 + r * Math.cos(angle),
    y: 90 + r * Math.sin(angle),
    size: Math.random() * 8 + 6,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

const fallingHearts = [];
for (let i = 0; i < 25; i++) {
  fallingHearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 6 + 4,
    speedY: Math.random() * 1 + 0.5,
    speedX: (Math.random() - 0.5) * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

// 3. Bucle Principal de Animación
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja el Tronco
  ctx.fillStyle = "#8d6e63";
  ctx.beginPath();
  ctx.moveTo(190, 250);
  ctx.lineTo(210, 250);
  ctx.lineTo(205, 140);
  ctx.lineTo(195, 140);
  ctx.closePath();
  ctx.fill();

  // Dibuja la Copa del Árbol (Corazones fijos)
  staticTreeHearts.forEach(h => drawHeart(h.x, h.y, h.size, h.color));

  // Actualiza y Dibuja los Corazones que Caen
  fallingHearts.forEach(h => {
    h.y += h.speedY;
    h.x += h.speedX;

    if (h.y > canvas.height) {
      h.y = -10;
      h.x = Math.random() * canvas.width;
    }

    drawHeart(h.x, h.y, h.size, h.color);
  });

  requestAnimationFrame(animate);
}

animate();

// 4. Lógica del Botón Interactivo "Razones por las que te amo"
const razones = [
  "Amo tu forma única de hacerme sonreír en cualquier momento. ❤️",
  "Amo lo increíble que eres y todo el apoyo que me das siempre.",
  "Amo compartir mis días y proyectos contigo.",
  "Eres mi persona favorita en todo el mundo. ✨",
  "Amo la manera en que iluminas mi vida con tu presencia.",
  "Gracias por existir y por hacerme tan feliz cada día."
];

const btnRazon = document.getElementById("btnRazon");
const textoRazon = document.getElementById("textoRazon");
let ultimoIndice = -1;

if (btnRazon && textoRazon) {
  btnRazon.addEventListener("click", () => {
    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * razones.length);
    } while (nuevoIndice === ultimoIndice && razones.length > 1);
    
    ultimoIndice = nuevoIndice;

    textoRazon.style.opacity = 0;
    textoRazon.style.transition = "opacity 0.2s ease";

    setTimeout(() => {
      textoRazon.innerText = razones[nuevoIndice];
      textoRazon.style.opacity = 1;
    }, 200);
  });
}