// CRIANDO UM MENU MINIMIZAVEL PARA INCLUIR MATERIAIS DE APOIO E INFORMAÇÕES PARA AS RESTITUIÇÕES
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

// Alterna entre as classes 'hidden' e 'visible' no clique
menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('visible');
  menuList.classList.toggle('hidden');
});
