




const meses = {
    "Janeiro": "01",
    "Fevereiro": "02",
    "Março": "03",
    "Abril": "04",
    "Maio": "05",
    "Junho": "06",
    "Julho": "07",
    "Agosto": "08",
    "Setembro": "09",
    "Outubro": "10",
    "Novembro": "11",
    "Dezembro": "12"
};

const mesesAnos = [];
for (let ano = 2019; ano <= 2025; ano++) {
    Object.keys(meses).forEach(mes => mesesAnos.push(`${mes}/${ano}`));
}

function converterDataParaNumerico(dataTexto) {
    const [mes, ano] = dataTexto.split('/');
    return `${meses[mes]}/${ano}`;
}

let resultadosFiltrados = {};

function buscarRubricas() {
    const inputText = document.getElementById('inputText').value;
    const sections = {};

    mesesAnos.forEach(mesAno => {
        const regex = new RegExp(`${mesAno}(.*?)((?=${mesesAnos.join('|')})|$)`, 's');
        const match = inputText.match(regex);
        if (match) {
            sections[mesAno] = match[1].trim();
        }
    });

    const container = document.getElementById('result');
    container.innerHTML = ''; // Limpa resultados anteriores

    // Cria uma tabela para exibir os totais de proventos por mês/ano
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = 
        `<thead>
            <tr>
                <th>Data</th>
                <th>Total de Proventos</th>
            </tr>
        </thead>
        <tbody></tbody>`;

    for (const [mesAno, data] of Object.entries(sections)) {
        if (data) {
            const resultDiv = document.createElement('div');
            const dataNumerica = converterDataParaNumerico(mesAno); // Converte para formato numérico
            resultDiv.innerHTML = `<h2>${dataNumerica}</h2>`; // Exibe a data no formato numérico
            container.appendChild(resultDiv);

            const totalProventos = processMonthlyData(mesAno, data, resultDiv);

            // Adiciona o total de proventos na tabela de totais
            const row = tabelaProventos.querySelector('tbody').insertRow();
            row.insertCell(0).innerText = dataNumerica; // Exibe a data no formato numérico
            row.insertCell(1).innerText = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    }

    // Adiciona a tabela de totais de proventos no topo da página
    const topTables = document.getElementById('topTables');
    topTables.innerHTML = '';
    topTables.appendChild(tabelaProventos);

    resultadosFiltrados = sections; // Salva os dados filtrados para uso posterior
}



















function processMonthlyData(mesAno, data, container) {
    const rubricas = ['0001', '0002', '0003', '0004', '0005', '0007', '0008', '0009', '0010', '0011', '0012', '0013', '0015', '0022', '0025', '002P', '0030', '0031', '0032', '0033', '0035', '0036', '0037', '0038', '0039', '003P', '0040', '0041', '0042', '0043', '0046', '0047', '0048', '0051', '0052', '0053', '0055', '0056', '0057', '0058', '005P', '0060', '0061', '0062', '0063', '00P1', '00P4', '00P5', '00P6', '00P7', '015P', '01P0', '01P1', '01P2', '01P3', '01P4', '01P5', '01P6', '01P9', '022P', '02P0', '02P1', '02P2', '02P3', '02P4', '02P5', '02P6', '02P7', '02P9', '03P0', '03P1', '03P2', '03P3', '03P4', '03P6', '03P7', '03P8', '03P9', '04P0', '04P1', '04P2', '04P3', '04P4', '04P6', '04P7', '04P8', '05P0', '05P1', '05P2', '05P3', '05P4', '05P5', '05P6', '05P7', '05P8', '05P9', '06P0', '06P1', '06P2', '06P3', '06P4', '06P5', '06P6', '06P7', '06P8', '06P9', '07P0', '07P1', '07P2', '07P3', '07P4', '07P5', '07P6', '07P7', '07P8', '07P9', '08P3', '08P4', '08P5', '08P6', '08P7', '08P8', '08P9', '09P0', '09P1', '09P2', '09P3', '09P4', '09P5', '09P6', '09P7', '09P8','09P9', '0H01', '0H02', '0H06', '0H07', '0H08', '0H09', '0H16', '0H18', '0H20', '0H21', '0H23', '0HP0', '0HP1', '0HP4', '0HP5', '0HP6', '0HP7', '0HP8', '0HP9', '0I04', '0I05', '0I06', '0I12', '0I13', '0I14', '0I15', '0I50', '0I51', '0I70', '0J00', '0J02', '0J04', '0J05', '0J06', '0J07', '0J08', '0J09', '0J10', '0J11', '0J12', '0J13', '0J14', '0J15', '0J16', '0J18', '0J19', '0J20', '0J22', '0J23', '0J24', '0J27', '0J28', '0J29', '0J30', '0J33', '0J35', '0J36', '0J37', '0J38', '0J39', '0J40', '0J41', '0J42', '0J43', '0J44', '0J45', '0J46', '0J47', '0J48', '0J49', '0J50', '0J51', '0J53', '0J54', '0J55', '0J56', '0J57', '0J58', '0J59', '0J60', '0J61', '0J62', '0J63', '0J64', '0J65', '0J66', '0J67', '0J69', '0J70', '0J71', '0J72', '0J75', '0J77', '0J78', '0J80', '0J83', '0J84', '0J85', '0J86', '0J87', '0J88', '0J89', '0J90', '0J91', '0J92', '0J93', '0J94', '0J95', '0J96', '0J97', '0J98', '0J99', '0P30', '0P31', '0P32', '0P33', '0P34', '0P35', '0P36', '0P37', '0P38', '0P40', '0P41', '0P42', '0P43', '0P44', '0P47', '0P48', '0P49', '0P50', '0P52', '0P53', '0P54', '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010','1011', '1012', '1013', '1016', '1018', '1021', '1022', '1023', '1025', '1026', '1027', '1028', '1029', '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1039', '1040', '1042', '1044', '1047', '1049', '1052', '1053', '1055', '1057', '1058', '1059', '1060', '1061', '1062', '1063', '1065', '1066', '1067', '1068', '1069', '1072', '1073', '1075', '1076', '1077', '1078', '1079', '1081', '1082', '1083', '1084', '1086', '1087', '1089', '1094', '1095', '1096', '10P0', '10P1', '10P2', '10P3', '10P4', '10P5', '10P6', '10P7', '10P8', '10P9', '1100', '1103', '1104', '1105', '1106', '1107', '1109', '1116', '1119', '1121', '1122', '1141', '1143', '1144', '1145', '1153', '1154', '1155', '1156', '1157', '1194', '1195', '1196', '11P0', '11P1', '11P2', '11P3', '11P4', '11P5', '11P6', '11P7', '11P9', '12P1', '12P2', '12P3', '12P4', '12P5', '12P6', '12P8', '12P9', '13P1', '13P3', '13P4', '13P5', '13P6', '13P7', '14P0', '14P1', '14P4', '14P6', '15P5', '15P6', '15P8', '16P0', '16P2', '16P9', '17P1', '17P6', '19P1', '19P2', '19P3', '19P4', '19P6', '19P7', '19P7', '19P8', '19P9', '1HP0', '1HP1', '1HP2', '1HP3', '1HP4', '1HP5', '1HP6', '1HP7', '1HP8', '1HP9', '1J01', '1J02', '1J04', '1J06', '1J07', '1J08', '1J09', '1J11', '1J12', '1J13', '1J15', '1J16', '1J18', '1J19', '1J20', '1J21', '1J22', '1J28', '2002', '2009', '2015', '2017', '2018', '2021','2023', '2025', '2027', '2029', '2031', '2032', '2033', '2036', '2037', '2048', '2057', '2058', '2077', '2078', '2078', '2079', '20P3', '20P4', '20P5', '20P6', '20P7', '20P8', '20P9', '21P3', '21P4', '21P5', '21P6', '21P7', '21P8', '21P9', '22P0', '22P1', '22P2', '22P4', '22P5', '22P6', '22P7', '22P8', '22P9', '23P1', '23P3', '23P4', '23P6', '23P7', '24P1', '24P3', '24P4', '24P5', '24P7', '2HP1', '2HP2', '2HP3', '2HP5', '2HP8', '3000', '3001', '3003', '3004', '3007', '3008', '3009', '3010', '3011', '3012', '3013', '3016', '3017', '3018', '3019', '3023', '3024', '3027', '3028', '3029', '3030', '3031', '3032', '3034', '3339', '3HP3', '3HP4', '3HP5', '3HP6', '3HP7', '4002', '4005', '4007', '4008', '4009', '4011', '4012', '4013', '4018', '4020', '4021', '4022', '4023', '4024', '4027', '4029', '4030', '4031', '4034', '4036', '4037', '4038', '4039', '4040', '4041', '4042', '4043', '4063', '4064', '4HP1', '4HP3', '4HP4', '7000', '1164', '1158', '1197', '1199', '1101', '1160', '1161', '0I08', '1162', '1163', '1J23', '1J24', '1J38', '1J40', '2105', '2147', '1198', '1J42', '4032', '1J45', '4068', '1J32', '1125', '1137', '1J50', '1J30', '16P8', '17P7', '18P4', '18P5', '1J03', '1J26', '1J41', '1J43', '1J44', '2HP6', '1J46', '/370', '0018', '/371', '/372', '0018', '0021', '0044', '0045', '0049', '0050', '0054', '0059', '0064', '0065', '0066', '0067', '0068', '0069', '0070', '0071', '0072', '0073', '0074', '0075', '0076', '0077', '0078', '00P2', '00P3', '00P8', '00P9', '01P7', '01P8', '02P8', '0A04', '0H00', '0H03', '0H05', '0H10', '0H13', '0H14', '0H15', '0H17', '0H19', '0H22', '0H24', '0H25', '0H26', '0H27', '0H28', '0H29', '0H31', '0H32', '0H33', '0H35', '0H36', '0H37', '0H38', '0H39', '0H40', '0H41', '0H43', '0H44', '0H46', '0H47', '0H48', '0H49', '0H54', '0H55', '0H58', '0H61', '0H64', '0H65', '0H68', '0H71', '0H80', '0H81', '0H85', '0H86', '0HP2', '0HP3','0I00', '0I02', '0I03', '0I07', '0I10', '0I11', '0I16', '0I17', '0I18', '0I19', '0I20', '0I23', '0I24', '0I25', '0I26', '0I27', '0I28', '0I29', '0I31', '0I34', '0I35', '0I36', '0I37', '0I38', '0I39', '0I40', '0I41', '0I42', '0I43', '0I44', '0I45', '0I46', '0I47', '0I48', '0I49', '0I53', '0I61', '0J01', '0J03', '0J17', '0J21', '0J26', '0J31', '0J32', '0J34', '0J52', '0J73', '0J74', '0J76', '0P39', '0P46', '0P51', '1014', '1015', '1017', '1019', '1020', '1038', '1041', '1043', '1045', '1046', '1048', '1050', '1051', '1054', '1056', '1064', '1071', '1074', '1080', '1085', '1092', '1098', '1099', '1102', '1115', '1118', '1120', '1138', '1139', '1140', '1142', '1146', '1147', '1148', '1149', '1150', '1151', '1152', '11P8', '12P0', '13P0', '13P2', '13P8', '14P2', '14P3', '14P5', '14P7', '14P8', '14P9', '15P1', '15P2', '15P3', '15P4', '15P7', '15P9', '16P1', '16P3', '16P4', '16P5', '17P2', '17P3', '17P4', '17P5', '17P9', '18P2', '18P8', '19P0', '1J00', '1J05', '1J10', '2003', '2016', '2022', '2026', '2034', '2035', '2038', '2039', '2047', '2049', '2050', '2052', '2054', '2055', '2056', '2082', '2083', '20P1', '20P2', '21P0', '21P1', '21P2', '21P0', '21P1', '21P2', '22P3', '23P2', '24P2', '2HP0', '2HP7', '3002', '3005', '3006', '3014', '3015', '3020', '3021', '3022', '3025', '3026', '3033', '3H10', '3HP0', '3HP8', '3HP9', '4003', '4004', '4006', '4010', '4015', '4016', '4017', '4019', '4025', '4026', '4028', '4033', '4035', '4057', '4058', '7013', '7082', '9913', '/T80', '0016', '0017', '0J79', '0J79', '1J27', '1J31', '1J33', '1J35', '1J36', '1J45', '1J46', '2305', '3035', '3036'];
    const rubricasDetalhadas = {
        "7033": "Assistência a Saúde",
        "7035": "Planserv / Cônjuge",
        "7038": "Planserv Agregado Jovem",
        "7039": "Planserv Agregado Maior",
        "7034": "Planserv / Dependente",
        "7037": "Planserv Especial",
        "7040": "Co-participação Planserv",
        "7049": "Planserv Retroativo",
        "7088": "Parc Risco Planserv Titul",
        "7090": "Parc Risco Planserv Conj",
        "7089": "Parc Risco Planserv Dep",
        "7044": "Restituição Planserv",
        "7091": "Parc Risco Planserv Agreg"
    };

    const lines = data.split('\n');

    // Passo 1: Identificar o ano mais recente
    let anoMaisRecente = '';
    lines.forEach(line => {
        const periodoMatch = line.match(/\d{2}\.(\d{4})/);
        if (periodoMatch) {
            const ano = periodoMatch[1];
            if (!anoMaisRecente || ano > anoMaisRecente) {
                anoMaisRecente = ano;
            }
        }
    });

    // Passo 2: Dentro do ano mais recente, identificar o mês mais recente
    let periodoMaisRecente = '';
    lines.forEach(line => {
        const periodoMatch = line.match(/(\d{2})\.(\d{4})/);
        if (periodoMatch) {
            const mes = periodoMatch[1];
            const ano = periodoMatch[2];
            if (ano === anoMaisRecente && (!periodoMaisRecente || mes > periodoMaisRecente.split('.')[0])) {
                periodoMaisRecente = `${mes}.${ano}`;
            }
        }
    });

    console.log("Período mais recente:", periodoMaisRecente);

    // Passo 3: Filtrar as rubricas que pertencem ao período mais recente
    const rubricasFiltradas = lines.filter(line => {
        const periodoMatch = line.match(/(\d{2})\.(\d{4})/);
        return periodoMatch && periodoMatch[0] === periodoMaisRecente;
    });

    console.log("Rubricas filtradas:", rubricasFiltradas);

    // Passo 4: Calcular os proventos apenas com as rubricas filtradas
    const proventosTable = document.createElement('table');
    proventosTable.innerHTML = 
        `<thead>
            <tr>
                <th>Proventos</th>
                <th>Descontos (desconsiderar)</th>
            </tr>
        </thead>
        <tbody></tbody>`;
    let totalProventos = 0;

    rubricasFiltradas.forEach(line => {
        const rubrica = line.substring(0, 4);
        if (rubricas.includes(rubrica)) {
            const values = line.match(/\d{1,3}(?:\.\d{3})*,\d{2}/g);
            if (values) {
                const row = proventosTable.querySelector('tbody').insertRow();
                const proventosCell = row.insertCell(0);
                const descontosCell = row.insertCell(1);
                proventosCell.textContent = values[0] || '';
                descontosCell.textContent = values[1] || '';

                if (values[0]) {
                    totalProventos += parseFloat(values[0].replace(/\./g, '').replace(',', '.'));
                }
            }
        }
    });

    container.appendChild(proventosTable);
    const totalProventosDiv = document.createElement('h3');
    totalProventosDiv.innerText = `Total de Proventos: ${totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    container.appendChild(totalProventosDiv);

    const rubricasTable = document.createElement('table');
    rubricasTable.innerHTML = 
        `<thead>
            <tr>
                <th>Rubrica</th>
                <th>Tipo</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody></tbody>`;

    rubricasFiltradas.forEach(line => {
        Object.keys(rubricasDetalhadas).forEach(rubrica => {
            const regex = new RegExp(`\\b${rubrica}\\b.*?(\\d{1,3}(?:\\.\\d{3})*,\\d{2})`);
            const match = line.match(regex);
            if (match) {
                const row = rubricasTable.querySelector('tbody').insertRow();
                row.insertCell(0).innerText = rubrica;
                row.insertCell(1).innerText = rubricasDetalhadas[rubrica];
                row.insertCell(2).innerText = match[1];
            }
        });
    });

    container.appendChild(rubricasTable);

    return totalProventos; // Retorna o total de proventos para ser usado na tabela de totais
}












//gera tabla para o titular
function gerarTabelaMensalidades7033() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Titular</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7033.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7033" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para conjuge
function gerarTabelaMensalidades7035() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Cônjuge</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7035.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7035" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Agregado Jovem
function gerarTabelaMensalidades7038() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Agregado Jovem</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7038.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou a rubrica seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Agregado Maior
function gerarTabelaMensalidades7039() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Agregado Maior</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7039.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7039" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Dependente
function gerarTabelaMensalidades7034() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Dependente</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7034.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7034" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Planserv Especial
function gerarTabelaMensalidades7037() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Planserv Especial</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7037.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7037" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Co-participação Planserv
function gerarTabelaMensalidades7040() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Co-participação</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7040.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7040" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Planserv Retroativo
function gerarTabelaMensalidades7049() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Retroativo</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7049.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7049" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Parc Risco Titul
function gerarTabelaMensalidades7088() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Parc Risco Titular</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7088.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7088" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Parc Risco Planserv Conj
function gerarTabelaMensalidades7090() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Parc Risco Cônjuge</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7090.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7089" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Parc Risco Planserv Dep
function gerarTabelaMensalidades7089() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Parc Risco Dependente</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7089.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7088" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Parc Risco Planserv Agreg
function gerarTabelaMensalidades7091() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Parc Risco Agregados</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7091.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7091" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}

//gera tabela para Restituição Planserv
function gerarTabelaMensalidades7044() {
    const container = document.getElementById('topTables');
    const tabelaProventos = document.createElement('table');
    tabelaProventos.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Restituição Planserv</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalProventos = 0;

        lines.forEach(line => {
            const match = line.match(/7044.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
             if (match && match[1]) { // Verifica se encontrou "7044" seguido por um valor numérico
             const value = match[1]; // O valor numérico encontrado depois da rubrica
           totalProventos += parseFloat(value.replace(/\./g, '').replace(',', '.'));
          }
        });

        const row = tabelaProventos.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const proventosCell = row.insertCell(1);
        dataCell.classList.add('no-copy'); // Adiciona a classe no-copy à célula de data
        dataCell.textContent = converterDataParaNumerico(mesAno);
        proventosCell.textContent = totalProventos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = ''; // Limpa antes de adicionar a nova tabela
    container.appendChild(tabelaProventos);
}




//TESTES TABELA GERAL

function gerarTabelaGeral() {
    const container = document.getElementById('topTables');
    const tabelaGeral = document.createElement('table');
    tabelaGeral.innerHTML = `
        <thead>
            <tr>
                <th>Data</th>
                <th>Titular</th>
                <th>Cônjuge</th>
                <th>Agregado <br> Jovem</th>
                <th>Agregado <br> Maior</th>
                <th>Dependente</th>
                <th>Planserv <br> Especial</th>
                <th>Co-participação</th>
                <th>Parc Risco <br> Titular</th>
                <th>Parc Risco <br> Cônjuge</th>
                <th>Parc Risco <br> Agregados</th>
                <th>Parc Risco <br> Dependente</th>
                <th>Restituição <br> Planserv</th>
                <th>Planserv <br> Retroativo</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    Object.keys(resultadosFiltrados).forEach(mesAno => {
        const data = resultadosFiltrados[mesAno];
        const lines = data.split('\n');
        let totalTitular = 0;
        let totalConjuge = 0;
        let totalAgregadoJovem = 0;
        let totalAgregadoMaior = 0;
        let totalDependente = 0;
        let totalPlanservEspecial = 0;
        let totalCoparticipacao = 0;
        let totalParcRiscoTitular = 0;
        let totalParcRiscoConjuge = 0;
        let totalParcRiscoAgregados = 0;
        let totalParcRiscoDependente = 0;
        let totalRestituicaoPlanserv = 0;
        let totalPlanservRetroativo = 0;

        lines.forEach(line => {
            const matchTitular = line.match(/7033.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchTitular && matchTitular[1]) {
                totalTitular += parseFloat(matchTitular[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchConjuge = line.match(/7035.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchConjuge && matchConjuge[1]) {
                totalConjuge += parseFloat(matchConjuge[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchAgregadoJovem = line.match(/7038.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchAgregadoJovem && matchAgregadoJovem[1]) {
                totalAgregadoJovem += parseFloat(matchAgregadoJovem[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchAgregadoMaior = line.match(/7039.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchAgregadoMaior && matchAgregadoMaior[1]) {
                totalAgregadoMaior += parseFloat(matchAgregadoMaior[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchDependente = line.match(/7034.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchDependente && matchDependente[1]) {
                totalDependente += parseFloat(matchDependente[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchPlanservEspecial = line.match(/7037.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchPlanservEspecial && matchPlanservEspecial[1]) {
                totalPlanservEspecial += parseFloat(matchPlanservEspecial[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchCoparticipacao = line.match(/7040.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchCoparticipacao && matchCoparticipacao[1]) {
                totalCoparticipacao += parseFloat(matchCoparticipacao[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchParcRiscoTitular = line.match(/7088.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchParcRiscoTitular && matchParcRiscoTitular[1]) {
                totalParcRiscoTitular += parseFloat(matchParcRiscoTitular[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchParcRiscoConjuge = line.match(/7090.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchParcRiscoConjuge && matchParcRiscoConjuge[1]) {
                totalParcRiscoConjuge += parseFloat(matchParcRiscoConjuge[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchParcRiscoAgregados = line.match(/7091.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchParcRiscoAgregados && matchParcRiscoAgregados[1]) {
                totalParcRiscoAgregados += parseFloat(matchParcRiscoAgregados[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchParcRiscoDependente = line.match(/7089.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchParcRiscoDependente && matchParcRiscoDependente[1]) {
                totalParcRiscoDependente += parseFloat(matchParcRiscoDependente[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchRestituicaoPlanserv = line.match(/7044.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchRestituicaoPlanserv && matchRestituicaoPlanserv[1]) {
                totalRestituicaoPlanserv += parseFloat(matchRestituicaoPlanserv[1].replace(/\./g, '').replace(',', '.'));
            }

            const matchPlanservRetroativo = line.match(/7049.*?(\d{1,3}(?:\.\d{3})*,\d{2})/);
            if (matchPlanservRetroativo && matchPlanservRetroativo[1]) {
                totalPlanservRetroativo += parseFloat(matchPlanservRetroativo[1].replace(/\./g, '').replace(',', '.'));
            }
        });

        const row = tabelaGeral.querySelector('tbody').insertRow();
        const dataCell = row.insertCell(0);
        const titularCell = row.insertCell(1);
        const conjugeCell = row.insertCell(2);
        const agregadoJovemCell = row.insertCell(3);
        const agregadoMaiorCell = row.insertCell(4);
        const dependenteCell = row.insertCell(5);
        const planservEspecialCell = row.insertCell(6);
        const coparticipacaoCell = row.insertCell(7);
        const parcRiscoTitularCell = row.insertCell(8);
        const parcRiscoConjugeCell = row.insertCell(9);
        const parcRiscoAgregadosCell = row.insertCell(10);
        const parcRiscoDependenteCell = row.insertCell(11);
        const restituicaoPlanservCell = row.insertCell(12);
        const planservRetroativoCell = row.insertCell(13);

        dataCell.classList.add('no-copy');
        dataCell.textContent = converterDataParaNumerico(mesAno);
        titularCell.textContent = totalTitular.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        conjugeCell.textContent = totalConjuge.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        agregadoJovemCell.textContent = totalAgregadoJovem.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        agregadoMaiorCell.textContent = totalAgregadoMaior.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        dependenteCell.textContent = totalDependente.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        planservEspecialCell.textContent = totalPlanservEspecial.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        coparticipacaoCell.textContent = totalCoparticipacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        parcRiscoTitularCell.textContent = totalParcRiscoTitular.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        parcRiscoConjugeCell.textContent = totalParcRiscoConjuge.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        parcRiscoAgregadosCell.textContent = totalParcRiscoAgregados.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        parcRiscoDependenteCell.textContent = totalParcRiscoDependente.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        restituicaoPlanservCell.textContent = totalRestituicaoPlanserv.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        planservRetroativoCell.textContent = totalPlanservRetroativo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    container.innerHTML = '';
    container.appendChild(tabelaGeral);
}
