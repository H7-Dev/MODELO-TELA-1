class DefinirQuantidadeItemContinuar {
    constructor(rootSelector, btnSelector, inputSelector, labelSelector, requiredClass, tableSelector, searchInputSelector, dockSelector, continueBtnSelector) {
        this.root = document.querySelector(rootSelector);
        this.btnSelector = btnSelector;
        this.inputSelector = inputSelector;
        this.labelSelector = labelSelector;
        this.requiredClass = requiredClass;
        this.table = document.querySelector(tableSelector);
        this.searchInput = document.querySelector(searchInputSelector);
        this.dock = document.querySelector(dockSelector);
        this.continueBtnSelector = continueBtnSelector;
        
        if (!this.root || !this.table || !this.searchInput || !this.dock) {
            console.error(`Elemento(s) não encontrado(s). Verifique os seletores.`);
            return;
        }
        this.init();
    }

    init() {
        this.root.addEventListener("click", (event) => {
            if (event.target.closest(this.continueBtnSelector)) {
                this.validarQuantidade();
            }
        });
    }

    validarQuantidade() {
        const input = this.root.querySelector(this.inputSelector);
        if (!input) {
            console.error("Input de quantidade não encontrado.");
            return;
        }
        
        const label = input.closest(this.labelSelector);
        if (!label) {
            console.error("Label pai não encontrado.");
            return;
        }

        const overlay = this.root;
        const atributos = {
            "data-codigo-interno": overlay.getAttribute("data-codigo-interno"),
            "data-item-selected": overlay.getAttribute("data-item-selected"),
            "data-numero-list": overlay.getAttribute("data-numero-list"),
            "data-img-iten": overlay.getAttribute("data-img-iten"),
            "input-value": input.value.trim()
        };

        if (input.value.trim() === "") {
            label.classList.add(this.requiredClass);
            input.focus();
        } else {
            label.classList.remove(this.requiredClass);
            this.adicionarNaTabela(atributos);
            this.limparOverlay();
            this.focarNaPrimeiraLinha();
            this.atualizarHotkeys();
        }
    }

    adicionarNaTabela(atributos) {
        const tbody = this.table.querySelector("tbody");
        if (!tbody) {
            console.error("Tabela não possui tbody.");
            return;
        }

        const existingRow = [...tbody.querySelectorAll("tr")].find(row => 
            row.querySelector(".td-descricao")?.textContent === atributos["data-item-selected"]
        );

        if (existingRow) {
            const qtdCell = existingRow.querySelector(".th-quantidade-iten");
            qtdCell.textContent = parseInt(qtdCell.textContent) + parseInt(atributos["input-value"]);
        } else {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td class="td-descricao">${atributos["data-item-selected"]}</td>
                <td class="td-cod-interno-item">${atributos["data-codigo-interno"] || "0000001"}</td>
                <td class="th-quantidade-iten">${atributos["input-value"]}</td>
                <td class="td-action-delete">
                    <button class="btn" type="button"><i class="icon-trash"></i></button>
                </td>
            `;
            tbody.appendChild(newRow);
        }
    }

    limparOverlay() {
        this.root.classList.add("ocultar");
        this.root.setAttribute("data-hotkey", "0");
        this.root.setAttribute("data-codigo-interno", "");
        this.root.setAttribute("data-item-selected", "");
        this.root.setAttribute("data-numero-list", "");
        this.root.setAttribute("data-img-iten", "");

        const input = this.root.querySelector(this.inputSelector);
        if (input) {
            input.value = "";
        }
    }

    focarNaPrimeiraLinha() {
        const firstRow = this.table.querySelector("tbody tr:first-child");
        if (firstRow) {
            firstRow.classList.add("active-rows");
            firstRow.focus();
        } else {
            console.warn("Nenhuma linha encontrada na tabela.");
        }
    }

    atualizarHotkeys() {
        document.querySelectorAll("[data-hotkey]").forEach(element => {
            element.setAttribute("data-hotkey", "0");
        });
        this.table.setAttribute("data-hotkey", "1");
    }
}

// Inicializando a nova classe para a overlay-popup com seletores como parâmetros
new DefinirQuantidadeItemContinuar(
    ".overlay-popup", 
    ".btn-add", 
    "#in_quantidade-item", 
    "label", 
    "item-requerido", 
    ".table",
    "#in_search",
    ".doca-left",
    ".btn-add-continuar"
);


class DefinirQuantidadeItem {
    constructor(rootSelector, btnSelector, inputSelector, labelSelector, requiredClass, tableSelector, searchInputSelector, dockSelector) {
        this.root = document.querySelector(rootSelector);
        this.btnSelector = btnSelector;
        this.inputSelector = inputSelector;
        this.labelSelector = labelSelector;
        this.requiredClass = requiredClass;
        this.table = document.querySelector(tableSelector);
        this.searchInput = document.querySelector(searchInputSelector);
        this.dock = document.querySelector(dockSelector);
        
        if (!this.root || !this.table || !this.searchInput || !this.dock) {
            console.error(`Elemento(s) não encontrado(s). Verifique os seletores.`);
            return;
        }
        this.init();
    }

    init() {
        this.root.addEventListener("click", (event) => {
            if (event.target.closest(this.btnSelector)) {
                this.validarQuantidade();
            }
        });
    }

    validarQuantidade() {
        const input = this.root.querySelector(this.inputSelector);
        if (!input) {
            console.error("Input de quantidade não encontrado.");
            return;
        }
        
        const label = input.closest(this.labelSelector);
        if (!label) {
            console.error("Label pai não encontrado.");
            return;
        }

        const overlay = this.root;
        const atributos = {
            "data-codigo-interno": overlay.getAttribute("data-codigo-interno"),
            "data-item-selected": overlay.getAttribute("data-item-selected"),
            "data-numero-list": overlay.getAttribute("data-numero-list"),
            "data-img-iten": overlay.getAttribute("data-img-iten"),
            "input-value": input.value.trim()
        };

        if (input.value.trim() === "") {
            label.classList.add(this.requiredClass);
            input.focus();
        } else {
            label.classList.remove(this.requiredClass);
            this.adicionarNaTabela(atributos);
            this.limparOverlay();
        }
    }

    adicionarNaTabela(atributos) {
        const tbody = this.table.querySelector("tbody");
        if (!tbody) {
            console.error("Tabela não possui tbody.");
            return;
        }

        const existingRow = [...tbody.querySelectorAll("tr")].find(row => 
            row.querySelector(".td-descricao")?.textContent === atributos["data-item-selected"]
        );

        if (existingRow) {
            const qtdCell = existingRow.querySelector(".th-quantidade-iten");
            qtdCell.textContent = parseInt(qtdCell.textContent) + parseInt(atributos["input-value"]);
        } else {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td class="td-descricao">${atributos["data-item-selected"]}</td>
                <td class="td-cod-interno-item">${atributos["data-codigo-interno"] || "0000001"}</td>
                <td class="th-quantidade-iten">${atributos["input-value"]}</td>
                <td class="td-action-delete">
                    <button class="btn" type="button"><i class="icon-trash"></i></button>
                </td>
            `;
            tbody.appendChild(newRow);
        }
    }

    limparOverlay() {
        this.root.classList.add("ocultar");
        this.root.setAttribute("data-hotkey", "0");
        this.root.setAttribute("data-codigo-interno", "");
        this.root.setAttribute("data-item-selected", "");
        this.root.setAttribute("data-numero-list", "");
        this.root.setAttribute("data-img-iten", "");

        const input = this.root.querySelector(this.inputSelector);
        if (input) {
            input.value = "";
        }

        this.dock.setAttribute("data-hotkey", "1");
        this.searchInput.focus();
        this.searchInput.select();
    }
}

// Inicializando a classe para a overlay-popup com seletores como parâmetros
new DefinirQuantidadeItem(
    ".overlay-popup", 
    ".btn-add", 
    "#in_quantidade-item", 
    "label", 
    "item-requerido", 
    ".table",
    "#in_search",
    ".doca-left"
);



class SelectItem {
    constructor(containerSelector, itemSelector, selectedClass = "select-iten") {
        this.container = document.querySelector(containerSelector);
        this.itemSelector = itemSelector;
        this.selectedClass = selectedClass;
        this.itens = [];
        this.currentIndex = -1;
        this.docLeft = document.querySelector(".doca-left");
        this.overlayPopup = document.querySelector(".overlay-popup");
        this.inputQuantidade = document.querySelector("#in_quantidade-item");
        this.tituloItenQuantidade = document.querySelector(".titulo-iten-quantidade");
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        this.updateItens();
        this.container.addEventListener("click", this.handleItemClick.bind(this));
        
        const observer = new MutationObserver(() => {
            this.updateItens();
            console.log("Lista de itens atualizada:", this.itens);
        });
        observer.observe(this.container, { childList: true, subtree: true });
    }
    
    updateItens() {
        this.itens = Array.from(this.container.querySelectorAll(this.itemSelector));
    }
    
    handleItemClick(event) {
        const clickedItem = event.target.closest(this.itemSelector);
        if (!clickedItem) return;
        
        this.itens.forEach(item => item.classList.remove(this.selectedClass));
        clickedItem.classList.add(this.selectedClass);
        this.currentIndex = this.itens.indexOf(clickedItem);
        
        if (this.abrirPopup()) {
            this.definirHotkey();
        }
    }
    
    abrirPopup() {
        if (!this.overlayPopup || !this.inputQuantidade || !this.tituloItenQuantidade) return false;
        
        const selectedItem = this.itens[this.currentIndex];
        if (!selectedItem) return false;
        
        const nomeItem = selectedItem.querySelector(".nome-iten")?.textContent.trim() || "";
        const codigoInterno = selectedItem.querySelector(".cod-interno-iten")?.textContent.replace("Código: ", "").trim() || "";
        const imgItem = selectedItem.querySelector(".img-iten")?.getAttribute("href") || "";
        const numeroList = selectedItem.querySelector(".numero-list")?.textContent.trim() || "";
        
        this.overlayPopup.classList.remove("ocultar");
        this.tituloItenQuantidade.textContent = nomeItem;
        this.inputQuantidade.focus();
        
        this.overlayPopup.setAttribute("data-codigo-interno", codigoInterno);
        this.overlayPopup.setAttribute("data-item-selected", nomeItem);
        this.overlayPopup.setAttribute("data-numero-list", numeroList);
        this.overlayPopup.setAttribute("data-img-iten", imgItem);
        
        return true;
    }
    
    definirHotkey() {
        document.querySelectorAll("[data-hotkey]").forEach(el => el.setAttribute("data-hotkey", "0"));
        this.overlayPopup.setAttribute("data-hotkey", "1");
    }
}

// Inicializa a classe para a lista de itens
new SelectItem(".container-itens", ".iten");




class SelectOptionsMod {
    constructor(configs = {}) {
        this.configs = configs;
        
        this.selectLabels = document.querySelectorAll(this.configs.seletorLabel);
        this.setupEventosGlobais();
        this.selectLabels.forEach((selectLabel) => {
            const selectOptions = document.querySelector(`${this.configs.seletorOpcoes}[data-correlator="${selectLabel.dataset.correlator}"]`);
            const input = selectLabel.querySelector(this.configs.seletorInput);
            input.dataset.placeholderOriginal = input.placeholder; // Armazena o placeholder original

            input.addEventListener('focus', () => this.mostrarOpcoes(selectOptions, selectLabel));
            input.addEventListener('blur', () => {
                if (input.value.trim() !== "") {
                    this.ocultarOpcoes(selectOptions);
                }
                this.validarRequerido(input, selectLabel);
            });
            input.addEventListener('input', () => {
                this.filtrarOpcoes(selectOptions, input);
                this.verificarInputVazio(selectOptions, selectLabel, input);
            });

            selectOptions.addEventListener('mousedown', (e) => this.selecionarOpcao(e, input, selectLabel));

            window.addEventListener('resize', () => this.posicionarOpcoes(selectOptions, selectLabel));
            window.addEventListener('scroll', () => this.posicionarOpcoes(selectOptions, selectLabel));

            this.posicionarOpcoes(selectOptions, selectLabel);
        });
    }

    setupEventosGlobais() {
        document.addEventListener('click', (e) => this.fecharTodosMenus(e));
    }

    fecharTodosMenus(event) {
        this.selectLabels.forEach((selectLabel) => {
            const selectOptions = document.querySelector(`${this.configs.seletorOpcoes}[data-correlator="${selectLabel.dataset.correlator}"]`);
            if (!selectLabel.contains(event.target) && !selectOptions.contains(event.target)) {
                this.ocultarOpcoes(selectOptions);
            }
        });
    }

    mostrarOpcoes(selectOptions, selectLabel) {
        this.fecharTodosMenus({ target: selectLabel }); // Fecha os outros menus
        this.posicionarOpcoes(selectOptions, selectLabel);
        selectOptions.classList.add(this.configs.classeMostrar);
    }

    ocultarOpcoes(selectOptions) {
        setTimeout(() => {
            selectOptions.classList.remove(this.configs.classeMostrar);
        }, 200);
    }

    posicionarOpcoes(selectOptions, selectLabel) {
        const labelRect = selectLabel.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        selectOptions.style.width = `${labelRect.width}px`;
        selectOptions.style.top = `${labelRect.bottom + scrollTop}px`;
        selectOptions.style.left = `${labelRect.left + scrollLeft}px`;
    }

    selecionarOpcao(event, input, selectLabel) {
        if (event.target.classList.contains(this.configs.seletorItemOpcao.replace('.', ''))) {
            input.value = event.target.textContent;
            selectLabel.dataset.value = event.target.dataset.value;
            this.ocultarOpcoes(event.currentTarget);
            this.dispararEventoDeSelecao(selectLabel.dataset.value);
        }
    }

    filtrarOpcoes(selectOptions, input) {
        const termo = input.value.toLowerCase();
        const opcoes = selectOptions.querySelectorAll(this.configs.seletorItemOpcao);
        
        opcoes.forEach(opcao => {
            const texto = opcao.textContent.toLowerCase();
            if (texto.includes(termo)) {
                opcao.style.display = 'block';
            } else {
                opcao.style.display = 'none';
            }
        });
    }

    verificarInputVazio(selectOptions, selectLabel, input) {
        if (input.value.trim() === "") {
            this.mostrarOpcoes(selectOptions, selectLabel);
        }
    }

    validarRequerido(input, selectLabel) {
        if (input.hasAttribute('required') && !input.value.trim()) {
            selectLabel.classList.add(this.configs.classeRequerido);
            input.placeholder = this.configs.textoPlaceholderRequerido; // Muda o placeholder
        } else {
            selectLabel.classList.remove(this.configs.classeRequerido);
            input.placeholder = input.dataset.placeholderOriginal; // Restaura o placeholder original
        }
    }

    dispararEventoDeSelecao(valorSelecionado) {
        const evento = new CustomEvent('opcaoSelecionada', {
            detail: valorSelecionado
        });
        document.dispatchEvent(evento);
    }
}

// Inicialização para todos os elementos 'label.lb-select'
new SelectOptionsMod({
    seletorLabel: 'label.lb-select',
    seletorOpcoes: 'ul.lb-select-options',
    seletorInput: 'input',
    seletorItemOpcao: '.md-option',
    classeMostrar: 'show',
    classeRequerido: 'item-requerido',
    textoPlaceholderRequerido: 'Campo Obrigatório'
});

class PesquisarListaClientes {
    constructor(inputId, listaId, dadosJson) {
        this.input = document.getElementById(inputId);
        this.listaRenderer = new ListaRenderer(listaId);
        this.dadosOriginais = dadosJson;
        
        if (!this.input) {
            throw new Error(`Input com id "${inputId}" não encontrado!`);
        }
        
        this.input.addEventListener('input', this.filtrarLista.bind(this));
    }

    filtrarLista() {
        const termoPesquisa = this.input.value.trim().toLowerCase();
        
        if (termoPesquisa === "") {
            this.listaRenderer.render(this.dadosOriginais);
            // console.log(this.dadosOriginais);
            return;
        }

        const resultadosFiltrados = this.dadosOriginais.filter(({ texto }) =>
            texto.toLowerCase().includes(termoPesquisa)
        );
        
        // console.log(resultadosFiltrados);
        this.listaRenderer.render(resultadosFiltrados);
    }
}

// Inicializa a pesquisa na lista com os dados JSON
const pesquisarListaClientes = new PesquisarListaClientes('input-cliente', 'listar-clientes', listarDeCliente);


