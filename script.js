// CRIANDO UM MENU MINIMIZAVEL PARA INCLUIR MATERIAIS DE APOIO E INFORMAÇÕES PARA AS RESTITUIÇÕES
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

// Alterna entre as classes 'hidden' e 'visible' no clique
menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('visible');
  menuList.classList.toggle('hidden');
});









//GIF ANIMADO
// Função para mover o GIF aleatoriamente
function moveGif() {
    const gif = document.getElementById('gif');
    const maxWidth = window.innerWidth - gif.offsetWidth; // Largura máxima para o movimento
    const maxHeight = window.innerHeight - gif.offsetHeight; // Altura máxima para o movimento

    // Define as posições aleatórias para o GIF
    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;

    // Aplica a posição aleatória ao estilo do GIF
    gif.style.left = `${randomX}px`;
    gif.style.top = `${randomY}px`;
}

// Chama a função a cada 2 segundos para mover o GIF
setInterval(moveGif, 2000);
