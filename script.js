// CRIANDO UM MENU MINIMIZAVEL PARA INCLUIR MATERIAIS DE APOIO E INFORMAÇÕES PARA AS RESTITUIÇÕES
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

// Alterna entre as classes 'hidden' e 'visible' no clique
menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('visible');
  menuList.classList.toggle('hidden');
});









//GIF ANIMADO
// Seleciona o elemento do GIF pelo ID
const gif = document.getElementById('random-gif');

// Função para gerar uma posição aleatória dentro da janela do navegador
function getRandomPosition() {
    // Calcula uma posição X aleatória, garantindo que o GIF não saia da tela
    const x = Math.random() * (window.innerWidth - gif.clientWidth);
    // Calcula uma posição Y aleatória, garantindo que o GIF não saia da tela
    const y = Math.random() * (window.innerHeight - gif.clientHeight);
    // Retorna um objeto com as coordenadas X e Y
    return { x, y };
}

// Função para mover o GIF para uma nova posição aleatória
function moveGif() {
    // Obtém uma nova posição aleatória
    const newPosition = getRandomPosition();
    // Atualiza a posição esquerda (left) do GIF
    gif.style.left = `${newPosition.x}px`;
    // Atualiza a posição superior (top) do GIF
    gif.style.top = `${newPosition.y}px`;
}

// Define um intervalo para chamar a função moveGif a cada 2 segundos (2000 milissegundos)
setInterval(moveGif, 2000);
