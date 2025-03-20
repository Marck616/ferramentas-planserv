const dataLimite = new Date('2025-06-01');

function verificarData() {
    const dataAtual = new Date();
    if (dataAtual > dataLimite) {
        alert('Erro. Favor entrar em contato com o criador: Marcos Oliveira (Email: marcos.oliveira@maida.health ou marcosmvlo.psi@gmail.com).');
        document.body.innerHTML = '';
        return false;
    }
    return true;
}

window.onload = function() {
    if (!verificarData()) {
        throw new Error("Acesso bloqueado devido à data limite expirada.");
    }
};
