// CRIANDO UM MENU MINIMIZAVEL PARA INCLUIR MATERIAIS DE APOIO E INFORMAÇÕES PARA AS RESTITUIÇÕES
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

// Alterna entre as classes 'hidden' e 'visible' no clique
menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('visible');
  menuList.classList.toggle('hidden');
});









//GIF ANIMADO

//GIF ANIMADO

const gif = document.getElementById('animated-gif');
const speed = 2; // Velocidade do movimento (em pixels por frame)
const size = 100; // Tamanho do GIF (em pixels)

// Verifica se o elemento gif existe antes de iniciar a animação
if (gif) {
    let posX = Math.random() * (window.innerWidth - size);
    let posY = Math.random() * (window.innerHeight - size);
    let directionX = Math.random() * 2 - 1; // Direção inicial aleatória
    let directionY = Math.random() * 2 - 1;

    // Define o estilo inicial do GIF para garantir que ele seja posicionado corretamente
    gif.style.position = 'absolute';
    gif.style.width = `${size}px`; // Define o tamanho do GIF
    gif.style.height = `${size}px`; // Define o tamanho do GIF

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
}

