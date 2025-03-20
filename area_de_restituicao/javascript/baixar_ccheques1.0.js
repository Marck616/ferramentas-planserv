/**
 * Função abrirLinks
 * Essa função gera e abre múltiplos links no navegador com base no intervalo de datas fornecido pelo usuário.
 * Se o número de abas exceder 100, a função exibe um aviso e impede a abertura para evitar travamentos.
 */
function abrirLinks() {
    // Obtém os valores dos campos de entrada do formulário
    var matricula = document.getElementById('matricula').value;
    var anoInicio = parseInt(document.getElementById('anoInicio').value, 10);
    var mesInicio = parseInt(document.getElementById('mesInicio').value, 10);
    var anoFim = parseInt(document.getElementById('anoFim').value, 10);
    var mesFim = parseInt(document.getElementById('mesFim').value, 10);

    var links = []; // Array para armazenar os links gerados

    // Laço para gerar links com base nos anos e meses fornecidos
    for (var ano = anoInicio; ano <= anoFim; ano++) {
        var mesComeco = ano === anoInicio ? mesInicio : 1; // Determina o mês inicial para o ano atual
        var mesTermino = ano === anoFim ? mesFim : 12;    // Determina o mês final para o ano atual

        for (var mes = mesComeco; mes <= mesTermino; mes++) {
            // Monta o link de acordo com os parâmetros fornecidos
            links.push("https://rhbahia.ba.gov.br/auditor/contracheque/file/pdf/" + ano + "/" + mes + "/1/" + matricula);
        }
    }

    // Verifica se o número total de links excede 100
    if (links.length > 100) {
        alert("O período selecionado resulta em mais de 100 abas a serem abertas. Para evitar travamentos, escolha um período menor.");
        return; // Interrompe a execução da função
    }

    // Abre cada link em uma nova aba do navegador
    for (var i = 0; i < links.length; i++) {
        window.open(links[i], '_blank');
    }
}

/**
 * Função abrirMes
 * Essa função abre o link de um mês específico, usando o ano de início como referência.
 * É útil para casos onde o usuário deseja abrir um mês único.
 *
 * @param {number} mes - O mês que será aberto no link.
 */
function abrirMes(mes) {
    // Obtém o valor do campo de matrícula e do ano inicial
    var matricula = document.getElementById('matricula').value;
    var ano = parseInt(document.getElementById('anoInicio').value, 10); // Garante que o ano seja tratado como número

    // Monta o link para o mês específico e abre em uma nova aba
    var link = "https://rhbahia.ba.gov.br/auditor/contracheque/file/pdf/" + ano + "/" + mes + "/1/" + matricula;
    window.open(link, '_blank');
}
