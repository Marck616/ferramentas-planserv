    // Primeira parte do script - Filtrar Valores
    const descriptions = [
      "PLANO DE SAUDE DOS SERV.PUBLICOS ESTADUA",
      "PLANSERV CONJUGE/COMPANHEIRO (A)",
      "PLANSERV AGREGADO MENOR",
      "PLANSERV AGREGADO MAIOR",
      "PLANSERV DEPENDENTE",
      "PLANSERV ESPECIAL",
      "CO-PARTICIPAÇÃO PLANSERV",
      "BRUTO PLANSERV",
    ];
    let parsedData = [];

    function parseContracheques() {
      const text = document.getElementById('inputText').value;
      const chequeRegex = /(.*?\d+\s\/\s\d+)/gs;
      const matches = text.matchAll(chequeRegex);

      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '<h2>Resultados:</h2>';
      parsedData = [];

      for (const match of matches) {
        const chequeText = match[1].trim();
        const values = extractValues(chequeText);
        const periodMatch = chequeText.match(/\b(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\/\d{4}\b/);
        const period = periodMatch ? convertPeriod(periodMatch[0]) : "Período não encontrado";
        parsedData.push({ period, values });

        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.innerHTML = `<div class="period">Período: ${period}</div>`;
        for (const [desc, value] of Object.entries(values)) {
          resultDiv.innerHTML += `<div>${desc}: ${value}</div>`;
        }
        resultsDiv.appendChild(resultDiv);
      }
      generateTableButtons();
    }

    function extractValues(text) {
  const valueRegex = /\d{1,3}(\.\d{3})*,\d{2}/g;
  const lines = text.split('\n').map(line => line.trim());
  const values = text.match(valueRegex) || [];
  const results = {};

  descriptions.forEach(desc => {
    const index = lines.findIndex(line => line.toUpperCase().includes(desc));
    if (index !== -1) {
      const line = lines[index];
      // Verifica se a linha contém tanto a descrição quanto o valor
      if (line.includes(desc) && valueRegex.test(line)) {
        const match = line.match(valueRegex);
        results[desc] = match ? match[0] : "Não encontrado";
      } else {
        // Caso contrário, procura o valor na próxima linha
        results[desc] = (index + 1 < lines.length && values[index]) ? values[index] : "Não encontrado";
      }
    } else {
      results[desc] = "Não encontrado";
    }
  });

  const brutoPlansverIndex = values.length - 4;
  results["BRUTO PLANSERV"] = brutoPlansverIndex >= 0 ? values[brutoPlansverIndex] : "Não encontrado";
  return results;
}

    function convertPeriod(period) {
      const months = { "JAN": "01🔷", "FEV": "02🔶", "MAR": "03🔷", "ABR": "04🔶", "MAI": "05🔷", "JUN": "06🔶", "JUL": "07🔷", "AGO": "08🔶", "SET": "09🔷", "OUT": "10🔶", "NOV": "11🔷", "DEZ": "12🔶" };
      const [month, year] = period.split('/');
      return `${months[month]}/${year}`;
    }

    function generateTableButtons() {
      const tablesDiv = document.getElementById('tables');
      tablesDiv.innerHTML = '<h2>Gerar Tabelas:</h2>';
      descriptions.forEach(desc => {
        const button = document.createElement('button');
        button.textContent = `Gerar tabela ${desc}`;
        button.onclick = () => generateTable(desc);
        tablesDiv.appendChild(button);
      });
    }


    function generateTable(description) {
  // Obtém o contêiner onde as tabelas serão exibidas
  const tablesDiv = document.getElementById('tables');
  // Limpa o conteúdo anterior do contêiner
  tablesDiv.innerHTML = '';
  // Cria um novo elemento <div> para conter a tabela
  const tableDiv = document.createElement('div');
  // Adiciona a classe 'table-container' ao <div> para estilização
  tableDiv.className = 'table-container';
  // Define o conteúdo HTML interno do <div>, incluindo um título (<h3>) com a descrição da tabela
  tableDiv.innerHTML = `<h3>${description}</h3>`;
  // Cria um novo elemento <table> para exibir os dados
  const table = document.createElement('table');
  // Define o cabeçalho da tabela com duas colunas: "Período" e "Valor"
  table.innerHTML = '<tr><th>Período</th><th>Valor</th></tr>';
  // Itera sobre os dados armazenados em `parsedData` (que contém os períodos e valores)
  parsedData.forEach(entry => {
    // Cria uma nova linha (<tr>) para cada entrada de dados
    const row = document.createElement('tr');
    // Preenche a linha com duas células (<td>):
    // 1. A primeira célula contém o período, com a classe "no-copy" para impedir a seleção de texto
    // 2. A segunda célula contém o valor correspondente à descrição ou "Não encontrado" se o valor não existir
    row.innerHTML = `<td class="no-copy">${entry.period}</td><td>${entry.values[description] || 'Não encontrado'}</td>`;
    // Adiciona a linha à tabela
    table.appendChild(row);
  });
  // Adiciona a tabela ao <div> criado anteriormente
  tableDiv.appendChild(table);
  // Adiciona o <div> com a tabela ao elemento com ID "tables" no HTML
  tablesDiv.appendChild(tableDiv);
}

    
    // Segunda parte do script - Filtrar Proventos
    function parseContracheques2() {
      const text = document.getElementById('inputText').value;
      const chequeRegex = /(.*?\d+\s\/\s\d+)/gs;
      const matches = text.matchAll(chequeRegex);

      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '<h2>Resultados:</h2>';

      let counter = 1;
      for (const match of matches) {
        const chequeText = match[1].trim();
        const values = extractValues2(chequeText);

        const periodMatch = chequeText.match(/\b(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\/\d{4}\b/);
        const period = periodMatch ? periodMatch[0] : `Período não encontrado (${counter})`;

        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.innerHTML = `<div class="period">Período: ${period}</div>`;

        let total = 0;
        for (const [description, value] of Object.entries(values)) {
          resultDiv.innerHTML += `<div>${description}: ${value}</div>`;
          if (description !== "BRUTO PLANSERV" && value !== "Não encontrado") {
            total += parseFloat(value.replace(".", "").replace(",", "."));
          }
        }

        const formattedTotal = total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        resultDiv.innerHTML += `<div><strong>Total das Rubricas Selecionadas: R$ ${formattedTotal}</strong></div>`;

        resultsDiv.appendChild(resultDiv);
        counter++;
      }
    }

    function extractValues2(text) {
      const descriptions = [
        "VENCIMENTO BASICO",
        "VANTAGEM PESSOAL EFICIENCIA LEI 7885/01",
        "ADICIONAL TEMPO DE SERVICO",
        "DIFERENCA AUMENTO",
        "GRATIFIC.ESP.EFICIENCIA ACUMULADA",
        "GRATIFIC.ESP.EFICIENCIA ACUMULADA",
        "GRATIFICAÇÃO DE ATIVIDADE EXTERNA",
        "VANT. PESSOAL INCENTIVO LEI 14027/18",
        "DIF DE VENCIMEN - ENQUADRAMENTO/PROGRESSÃO",
        "DIFERENCA DE NIVEL",
        "DIF CRÉDITO - DIFERENÇA DE VENCIMENTOS",
        "DIFERENCA ANUENIO",
        "ADICIONAL FUNCAO"
      ];

      const valueRegex = /\d{1,3}(\.\d{3})*,\d{2}/g;
      const lines = text.split('\n').map(line => line.trim());
      const values = text.match(valueRegex) || [];

      const results = {};
      descriptions.forEach(description => {
        const index = lines.findIndex(line => line.toUpperCase() === description);
        results[description] = (index !== -1 && values[index]) ? values[index] : "Não encontrado";
      });

      const brutoPlansverIndex = values.length - 4;
      results["BRUTO PLANSERV"] = brutoPlansverIndex >= 0 ? values[brutoPlansverIndex] : "Não encontrado";

      return results;
    }
