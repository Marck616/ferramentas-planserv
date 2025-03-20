//CONTROLE DE ZOOM DOS IFRAMES DOS PDFS///
//CONTROLE DE ZOOM DOS IFRAMES DOS PDFS///
//CONTROLE DE ZOOM DOS IFRAMES DOS PDFS///

        // Atualiza o valor do zoom quando o controle deslizante é ajustado
        const zoomSlider = document.getElementById('zoomSlider');
        const zoomValue = document.getElementById('zoomValue');

        zoomSlider.addEventListener('input', () => {
            zoomValue.textContent = `${zoomSlider.value}px`;
            ajustarTamanhoPDFs(zoomSlider.value);
        });

        // Ajusta o tamanho dos PDFs exibidos
        function ajustarTamanhoPDFs(tamanho) {
            const iframes = document.querySelectorAll('.pdf-item iframe');
            iframes.forEach(iframe => {
                iframe.style.width = `${tamanho}px`;
                iframe.style.height = `${tamanho}px`;
            });
        }

//CONTROLE DE ZOOM DOS IFRAMES DOS PDFS///
//CONTROLE DE ZOOM DOS IFRAMES DOS PDFS///
//CONTROLE DE ZOOM DOS IFRAMES DOS PDFS///        


        
        let pdfCounter = 0;

        function gerarPDFs() {
            const matricula = document.getElementById('matricula').value;
            const anoInicio = parseInt(document.getElementById('anoInicio').value);
            const mesInicio = parseInt(document.getElementById('mesInicio').value);
            const anoFim = parseInt(document.getElementById('anoFim').value);
            const mesFim = parseInt(document.getElementById('mesFim').value);

            const pdfContainer = document.getElementById('pdfContainer');
            pdfContainer.innerHTML = ''; // Limpa PDFs anteriores

            if (!matricula || isNaN(anoInicio) || isNaN(mesInicio) || isNaN(anoFim) || isNaN(mesFim)) {
                alert("Por favor, preencha todos os campos corretamente.");
                return;
            }

            for (let ano = anoInicio; ano <= anoFim; ano++) {
                const mesInicioCorrigido = ano === anoInicio ? mesInicio : 1;
                const mesFimCorrigido = ano === anoFim ? mesFim : 12;

                for (let mes = mesInicioCorrigido; mes <= mesFimCorrigido; mes++) {
                    const link = `https://rhbahia.ba.gov.br/auditor/contracheque/file/pdf/${ano}/${mes}/1/${matricula}`;
                    criarIframe(link);
                }
            }
        }


        // Abertura por mês:
        function abrirMes(mes) {
            const matricula = document.getElementById('matricula').value;
            const ano = document.getElementById('anoInicio').value;

            if (!matricula || !ano) {
                alert("Por favor, preencha a matrícula e o ano de início.");
                return;
            }

            const link = `https://rhbahia.ba.gov.br/auditor/contracheque/file/pdf/${ano}/${mes}/1/${matricula}`;
            criarIframe(link);
        }

        function criarIframe(link) {
            pdfCounter++;
            const pdfContainer = document.getElementById('pdfContainer');
            
            const pdfItem = document.createElement('div');
            pdfItem.className = 'pdf-item';
            
            const pdfInfo = document.createElement('div');
            pdfInfo.className = 'pdf-info';
            pdfInfo.innerText = `PDF ${pdfCounter}`;
            
            const checkboxContainer = document.createElement('div');
            checkboxContainer.className = 'checkbox-container';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox-${pdfCounter}`;
            const checkboxLabel = document.createElement('label');
            checkboxLabel.htmlFor = `checkbox-${pdfCounter}`;
            checkboxLabel.innerText = "Visto";

            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(checkboxLabel);

            const iframe = document.createElement('iframe');
            iframe.src = link;
            iframe.title = "Visualizador de PDF";

            iframe.addEventListener('mouseenter', () => {
                pdfItem.classList.add('interacted');
            });

            pdfItem.appendChild(pdfInfo);
            pdfItem.appendChild(iframe);
            pdfItem.appendChild(checkboxContainer);
            pdfContainer.appendChild(pdfItem);
        }

