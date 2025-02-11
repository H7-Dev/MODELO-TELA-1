class ListaRenderer {
    constructor(listaId) {
        this.lista = document.getElementById(listaId);
        if (!this.lista) {
            throw new Error(`Lista com id "${listaId}" não encontrada!`);
        }
    }

    render(jsonData) {
        if (!Array.isArray(jsonData)) {
            throw new Error("Os dados fornecidos não são um array válido.");
        }

        // Limpa o conteúdo atual da lista
        this.lista.innerHTML = '';

        // Adiciona cada item à lista
        jsonData.forEach(({ dataValue, texto }) => {
            const li = document.createElement('li');
            li.classList.add('md-option');
            li.setAttribute('data-value', dataValue);
            li.textContent = texto;
            this.lista.appendChild(li);
        });
    }
}

// Exemplo de dados JSON
const listarDeCliente = [
    { dataValue: "1", texto: "ArKa" },
    { dataValue: "2", texto: "ArKa Solar" },
    { dataValue: "3", texto: "ArKa Comercial" },
    { dataValue: "4", texto: "ArKa Container Brasil" },
    { dataValue: "5", texto: "Arcelor" },
    { dataValue: "6", texto: "Arcelor Mital" },
    { dataValue: "7", texto: "Arcelor Mital Brasil" },
    { dataValue: "8", texto: "LT GONÇALVES" },
    { dataValue: "9", texto: "FORTE ENGENHARIA" },
    { dataValue: "10", texto: "Vale" },
    { dataValue: "11", texto: "VIX" },
    { dataValue: "12", texto: "Vale Do Rio Doce" },
    { dataValue: "13", texto: "Cafe Caramelhor" },
    { dataValue: "14", texto: "Mercadinho" },
    { dataValue: "15", texto: "Igreja" }
];

// Inicializa a classe e renderiza os dados na lista com ID 'listar-clientes'
const listaRenderer = new ListaRenderer('listar-clientes');
listaRenderer.render(listarDeCliente);



// Exemplo de dados JSON
const listarDeContratos = [
    { dataValue: "1", texto: "00100" },
    { dataValue: "2", texto: "00102" },
    { dataValue: "3", texto: "00103" },
    { dataValue: "4", texto: "00104" },
    { dataValue: "5", texto: "00200" },
    { dataValue: "6", texto: "00201" },
    { dataValue: "7", texto: "00202" },
    { dataValue: "8", texto: "00203" },
    { dataValue: "9", texto: "00204" },
    { dataValue: "10", texto: "00205" }
];

// Inicializa a classe e renderiza os dados na lista com ID 'listar-clientes'
const listarContrato = new ListaRenderer('listar-contratos');
listarContrato.render(listarDeContratos);



class ListarItenAlmoxarifado {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            throw new Error("Container não encontrado!");
        }
    }

    render(JsonDataMainItens) {
        // Limpa o conteúdo atual do container
        this.container.innerHTML = '';

        // Adiciona cada item ao container
        JsonDataMainItens.forEach(item => {
            const htmlItem = `
                <div class="iten">
                    <div class="iten-header">
                        <div class="codigo-item">
                            <span class="rotulo">#</span>
                            <span class="conteudo numero-list">${item.codigoHeader}</span>
                        </div>
                    </div>
                    <div class="iten-main">
                        <div class="top nome-iten">${item.descricao}</div>
                        <div class="bottom cod-interno-iten"><b>Código: </b>${item.codigoInterno}</div>
                    </div>
                    <div class="iten-footer">
                        <a class="img-iten" href="${item.linkImagem}" target="_blank" rel="noopener noreferrer">Imagem Link</a>
                    </div>
                </div>
            `;
            this.container.insertAdjacentHTML('beforeend', htmlItem);
        });
    }
}

// Exemplo de uso
const JsonDataMainItens = [
    {
        "codigoHeader": "A1",
        "descricao": "Parafuso Sextavado autobrocante 9x50",
        "codigoInterno": "0000001",
        "linkImagem": "https://img.lojadomecanico.com.br/IMAGENS/46/448/144608/1591381213650.JPG"
    },
    {
        "codigoHeader": "A2",
        "descricao": "Joelho Latão 25x1/2",
        "codigoInterno": "0000002",
        "linkImagem": "https://th.bing.com/th/id/OIP.Y2w_2Yk5Gm2Q-3ZNXsUS-AHaHa?rs=1&pid=ImgDetMain"
    },
    {
        "codigoHeader": "A3",
        "descricao": "Joelho Esgoto 40",
        "codigoInterno": "0000003",
        "linkImagem": "https://th.bing.com/th/id/OIP.wU3iSvejQv1u5QnJjduvdAHaHa?rs=1&pid=ImgDetMain"
    },
    {
        "codigoHeader": "A4",
        "descricao": "Joelho Esgoto 100",
        "codigoInterno": "0000004",
        "linkImagem": "https://http2.mlstatic.com/D_NQ_NP_658327-MLB43991909692_112020-F.jpg"
    },
    {
        "codigoHeader": "A5",
        "descricao": "Joelho Esgoto 100",
        "codigoInterno": "0000005",
        "linkImagem": "https://http2.mlstatic.com/D_NQ_NP_658327-MLB43991909692_112020-F.jpg"
    },
    {
        "codigoHeader": "A6",
        "descricao": "TÊ Com Bucha de Latão 25x1/2",
        "codigoInterno": "0000006",
        "linkImagem": "https://a-static.mlcdn.com.br/800x560/te-azul-com-bucha-de-latao-amanco-25x1-2/rcdeletrica2/70013123/c00a6fd5fda174f794c1cb623d34d982.jpeg"
    },
    {
        "codigoHeader": "A7",
        "descricao": "TÊ Esgoto 40mm",
        "codigoInterno": "0000007",
        "linkImagem": "https://cdn.awsli.com.br/2500x2500/1224/1224098/produto/173818089/39e99bb263.jpg"
    },
    {
        "codigoHeader": "A8",
        "descricao": "TÊ Esgoto 100mm",
        "codigoInterno": "0000008",
        "linkImagem": "https://th.bing.com/th/id/OIP.eq7MsazCw5uNRrkr2ELW7QHaHa?rs=1&pid=ImgDetMain"
    },
    {
        "codigoHeader": "A9",
        "descricao": "TÊ Esgoto 100mm",
        "codigoInterno": "0000009",
        "linkImagem": "https://th.bing.com/th/id/OIP.eq7MsazCw5uNRrkr2ELW7QHaHa?rs=1&pid=ImgDetMain"
    },
    {
        "codigoHeader": "A10",
        "descricao": "Luva Azul 25x1/2",
        "codigoInterno": "0000010",
        "linkImagem": "https://www.lizotferragens.com.br/_uploads/ProdutoDestaque/ProdutoDestaque_1918_orig.png"
    },
    {
        "codigoHeader": "A11",
        "descricao": "Luva de 40mm",
        "codigoInterno": "0000011",
        "linkImagem": "https://th.bing.com/th/id/OIP.hQe2q_YkJ-AWJjMssh1wkgHaHa?rs=1&pid=ImgDetMain"
    },
    {
        "codigoHeader": "A12",
        "descricao": "Luva de 100mm",
        "codigoInterno": "0000012",
        "linkImagem": "https://static3.tcdn.com.br/img/img_prod/624414/luva_pvc_esgoto_simples_de_100mm_865_1_20200120151053.jpg"
    }
]
// Inicializa a classe e renderiza os dados
const renderer = new ListarItenAlmoxarifado('.container-itens');
renderer.render(JsonDataMainItens);




class ListarFiltrarItensAlmoxarifado {
    constructor(containerSelector, inputSelector, data) {
        this.container = document.querySelector(containerSelector);
        this.input = document.querySelector(inputSelector);
        this.data = data || [];
        
        if (!this.container) {
            throw new Error("Container não encontrado!");
        }
        if (!this.input) {
            throw new Error("Input de pesquisa não encontrado!");
        }

        this.input.addEventListener('input', () => this.filtrarItens());
        this.render();
    }

    render(data = this.data) {
        this.container.innerHTML = '';
        
        data.forEach(item => {
            const htmlItem = `
                <div class="iten">
                    <div class="iten-header">
                        <div class="codigo-item">
                            <span class="rotulo">#</span>
                            <span class="conteudo numero-list">${item.codigoHeader}</span>
                        </div>
                    </div>
                    <div class="iten-main">
                        <div class="top nome-iten">${item.descricao}</div>
                        <div class="bottom cod-interno-iten"><b>Código: </b>${item.codigoInterno}</div>
                    </div>
                    <div class="iten-footer">
                        <a class="img-iten" href="${item.linkImagem}" target="_blank" rel="noopener noreferrer">Imagem Link</a>
                    </div>
                </div>
            `;
            this.container.insertAdjacentHTML('beforeend', htmlItem);
        });
    }

    filtrarItens() {
        const termo = this.input.value.toLowerCase().trim();
        const itensFiltrados = this.data.filter(item =>
            Object.values(item).some(valor =>
                typeof valor === 'string' && valor.toLowerCase().includes(termo)
            )
        );
        this.render(itensFiltrados);
    }
}

// Exemplo de uso
new ListarFiltrarItensAlmoxarifado('.container-itens', '#in_search', JsonDataMainItens);
