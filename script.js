// CRIANDO UM MENU MINIMIZAVEL PARA INCLUIR MATERIAIS DE APOIO E INFORMAÇÕES PARA AS RESTITUIÇÕES
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

// Alterna entre as classes 'hidden' e 'visible' no clique
menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('visible');
  menuList.classList.toggle('hidden');
});









//GIF ANIMADO

// script.js
const gif = document.getElementById('animated-gif');
const speed = 2; // Velocidade do movimento (em pixels por frame)
const size = 100; // Tamanho do GIF (em pixels)

let posX = Math.random() * (window.innerWidth - size);
let posY = Math.random() * (window.innerHeight - size);
let directionX = Math.random() * 2 - 1; // Direção inicial aleatória
let directionY = Math.random() * 2 - 1;

function moveGif() {
    // Atualiza a posição do GIF
    posX += directionX * speed;
    posY += directionY * speed;

    // Verifica colisões com as bordas da janela e inverte a direção
    if (posX <= 0 || posX >= window.innerWidth - size) {
        directionX *= -1;
    }
    if (posY <= 0 || posY >= window.innerHeight - size) {
        directionY *= -1;
    }

    // Aplica a nova posição ao GIF
    gif.style.left = `${posX}px`;
    gif.style.top = `${posY}px`;

    // Repete a animação
    requestAnimationFrame(moveGif);
}

// Inicia a animação
moveGif();
