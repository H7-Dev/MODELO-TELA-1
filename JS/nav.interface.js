class DefinirQuantidadeItemContinuar_nav {
    constructor(rootSelector, inputSelector, labelSelector, requiredClass, tableSelector, dockSelector) {
        this.root = document.querySelector(rootSelector);
        this.inputSelector = inputSelector;
        this.labelSelector = labelSelector;
        this.requiredClass = requiredClass;
        this.table = document.querySelector(tableSelector);
        this.dock = document.querySelector(dockSelector);
        
        if (!this.root || !this.table || !this.dock) {
            console.error(`Elemento(s) não encontrado(s). Verifique os seletores.`);
            return;
        }
        this.init();
    }

    init() {
        document.addEventListener("keydown", (event) => {
            if (event.ctrlKey && event.key === "Enter") {
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
new DefinirQuantidadeItemContinuar_nav(
    ".overlay-popup", 
    "#in_quantidade-item", 
    "label", 
    "item-requerido", 
    ".table",
    ".doca-left"
);


class DefinirQuantidadeItem_nav {
    constructor(rootSelector, inputSelector, labelSelector, requiredClass, tableSelector, searchInputSelector, dockSelector) {
        this.root = document.querySelector(rootSelector);
        this.input = document.querySelector(inputSelector);
        this.labelSelector = labelSelector;
        this.requiredClass = requiredClass;
        this.table = document.querySelector(tableSelector);
        this.searchInput = document.querySelector(searchInputSelector);
        this.dock = document.querySelector(dockSelector);

        if (!this.root || !this.table || !this.searchInput || !this.dock || !this.input) {
            console.error(`Elemento(s) não encontrado(s). Verifique os seletores.`);
            return;
        }

        this.observarMudancasHotkey();
        this.init();
    }

    observarMudancasHotkey() {
        const observer = new MutationObserver(() => {
            console.log(`Atributo data-hotkey mudou para: ${this.root.getAttribute("data-hotkey")}`);
        });

        observer.observe(this.root, { attributes: true, attributeFilter: ["data-hotkey"] });
    }

    init() {
        console.log("Inicializando evento de tecla Enter...");
        this.input.addEventListener("keydown", (event) => {
            console.log(`Tecla pressionada: ${event.key}`);
            if (event.key === "Enter" && !event.ctrlKey) {
                const hotkeyValue = this.root.getAttribute("data-hotkey");
                if (hotkeyValue === "1") {
                    event.preventDefault();
                    console.log("Tecla Enter detectada! Executando validarQuantidade...");
                    this.validarQuantidade();
                }
            }
        });
    }

    validarQuantidade() {
        console.log("Executando validarQuantidade...");
        
        if (!this.input) {
            console.error("Input de quantidade não encontrado.");
            return;
        }
        
        const label = this.input.closest(this.labelSelector);
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
            "input-value": this.input.value.trim()
        };

        if (this.input.value.trim() === "") {
            console.warn("Campo de quantidade está vazio!");
            label.classList.add(this.requiredClass);
            this.input.focus();
        } else {
            console.log("Quantidade válida! Adicionando à tabela...");
            label.classList.remove(this.requiredClass);
            this.adicionarNaTabela(atributos, () => this.limparOverlay());
        }
    }

    adicionarNaTabela(atributos, callback) {
        const tbody = this.table.querySelector("tbody");
        if (!tbody) {
            console.error("Tabela não possui tbody.");
            return;
        }

        const existingRow = [...tbody.querySelectorAll("tr")].find(row => 
            row.querySelector(".td-descricao")?.textContent === atributos["data-item-selected"]
        );

        if (existingRow) {
            console.log("Item já existe, atualizando quantidade...");
            const qtdCell = existingRow.querySelector(".th-quantidade-iten");
            qtdCell.textContent = parseInt(qtdCell.textContent) + parseInt(atributos["input-value"]);
        } else {
            console.log("Adicionando novo item na tabela...");
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
        
        setTimeout(() => {
            callback();
        }, 50);
    }

    limparOverlay() {
        console.log("Limpando overlay e redefinindo valores...");
        
        this.root.classList.add("ocultar");
        this.root.setAttribute("data-hotkey", "0");
        this.root.setAttribute("data-codigo-interno", "");
        this.root.setAttribute("data-item-selected", "");
        this.root.setAttribute("data-numero-list", "");
        this.root.setAttribute("data-img-iten", "");

        if (this.input) {
            this.input.value = "";
        }

        this.dock.setAttribute("data-hotkey", "1");
        this.searchInput.focus();
        this.searchInput.select();

        setTimeout(() => {
            if (!this.root.classList.contains("ocultar")) {
                console.error("Erro: overlay-popup não foi ocultado corretamente.");
            }
        }, 50);
    }
}

new DefinirQuantidadeItem_nav(
    ".overlay-popup", 
    "#in_quantidade-item", 
    "label", 
    "item-requerido", 
    ".table",
    "#in_search",
    ".doca-left"
);

class SelectItem_Nav {
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
        document.addEventListener("DOMContentLoaded", () => {
            document.addEventListener("keydown", this.handleKeyDown.bind(this));
            this.updateItens();
            
            const observer = new MutationObserver(() => {
                const previousIndex = this.currentIndex;
                this.updateItens();
                console.log("Lista de itens atualizada:", this.itens);
                
                this.currentIndex = -1;
                
                if (previousIndex >= 0 && previousIndex < this.itens.length) {
                    this.currentIndex = previousIndex;
                    this.itens[this.currentIndex].classList.add(this.selectedClass);
                }
            });
            observer.observe(this.container, { childList: true, subtree: true });
        });
    }
    updateItens() {
        this.itens = Array.from(this.container.querySelectorAll(this.itemSelector));
    }
    handleKeyDown(event) {
        if (!this.docLeft || this.docLeft.getAttribute("data-hotkey") !== "1") return;
        if (this.itens.length === 0) return;
        
        if (event.key === "ArrowDown") {
            this.moveSelection(1);
        } else if (event.key === "ArrowUp") {
            this.moveSelection(-1);
        } else if (event.key === "Enter") {
            if (this.abrirPopup()) {
                this.definirHotkey();
            }
        }
    }
    moveSelection(direction) {
        if (this.currentIndex !== -1) {
            this.itens[this.currentIndex].classList.remove(this.selectedClass);
        }
        
        this.currentIndex += direction;
        
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        } else if (this.currentIndex >= this.itens.length) {
            this.currentIndex = this.itens.length - 1;
        }
        
        this.itens[this.currentIndex].classList.add(this.selectedClass);
        this.itens[this.currentIndex].scrollIntoView({ block: "center", behavior: "smooth" });
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
new SelectItem_Nav(".container-itens", ".iten");



class SelectOptionsMod_nav {
    constructor(configs = {}) {
        this.configs = configs;
        this.selectLabels = document.querySelectorAll(this.configs.seletorLabel);
        this.setupEventosGlobais();
        this.selectLabels.forEach((selectLabel) => {
            this.setupSelectLabel(selectLabel);
        });
    }

    setupEventosGlobais() {
        document.addEventListener("click", (e) => this.fecharTodosMenus(e));
    }

    setupSelectLabel(selectLabel) {
        const selectOptions = document.querySelector(`${this.configs.seletorOpcoes}[data-correlator="${selectLabel.dataset.correlator}"]`);
        const input = selectLabel.querySelector(this.configs.seletorInput);
        if (!selectOptions || !input) return;

        input.dataset.placeholderOriginal = input.placeholder;

        input.addEventListener("focus", () => {
            this.definirHotkey(selectLabel);
            this.mostrarOpcoes(selectOptions, selectLabel);
        });
        input.addEventListener("blur", () => {
            this.removerHotkey(selectLabel);
        });
        input.addEventListener("keydown", (e) => this.handleKeyDown(e, selectOptions, input, selectLabel));
        selectOptions.addEventListener("mousedown", (e) => this.selecionarOpcao(e, input, selectLabel));
    }

    definirHotkey(selectLabel) {
        document.querySelectorAll("[data-hotkey]").forEach(element => element.setAttribute("data-hotkey", "0"));
        selectLabel.setAttribute("data-hotkey", "1");
    }

    removerHotkey(selectLabel) {
        selectLabel.setAttribute("data-hotkey", "0");
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
        this.fecharTodosMenus({ target: selectLabel });
        selectOptions.classList.add(this.configs.classeMostrar);
    }

    ocultarOpcoes(selectOptions) {
        setTimeout(() => {
            selectOptions.classList.remove(this.configs.classeMostrar);
        }, 200);
    }

    handleKeyDown(e, selectOptions, input, selectLabel) {
        if (selectLabel.getAttribute("data-hotkey") !== "1") return;
        if (!selectOptions.classList.contains(this.configs.classeMostrar)) return;
        
        const options = selectOptions.querySelectorAll(this.configs.seletorItemOpcao);
        let currentIndex = Array.from(options).findIndex(opt => opt.classList.contains("nav-option"));

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                this.navigate(options, 1, currentIndex);
                break;
            case "ArrowUp":
                e.preventDefault();
                this.navigate(options, -1, currentIndex);
                break;
            case "Enter":
                e.preventDefault();
                this.selectOption(options, currentIndex, input, selectLabel);
                break;
            case "Escape":
                this.ocultarOpcoes(selectOptions);
                break;
        }
    }

    navigate(options, direction, currentIndex) {
        if (options.length === 0) return;

        if (currentIndex !== -1) {
            options[currentIndex].classList.remove("nav-option");
        }

        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = options.length - 1;
        } else if (currentIndex >= options.length) {
            currentIndex = 0;
        }

        options[currentIndex].classList.add("nav-option");
        options[currentIndex].scrollIntoView({ block: "nearest" });
    }

    selectOption(options, currentIndex, input, selectLabel) {
        if (currentIndex !== -1) {
            input.value = options[currentIndex].textContent;
            selectLabel.dataset.value = options[currentIndex].dataset.value;
            this.ocultarOpcoes(options[currentIndex].closest(this.configs.seletorOpcoes));
        }
    }

    selecionarOpcao(event, input, selectLabel) {
        if (event.target.classList.contains(this.configs.seletorItemOpcao.replace('.', ''))) {
            input.value = event.target.textContent;
            selectLabel.dataset.value = event.target.dataset.value;
            this.ocultarOpcoes(event.currentTarget);
        }
    }
}

// Inicialização para todos os elementos 'label.lb-select'
new SelectOptionsMod_nav({
    seletorLabel: "label.lb-select",
    seletorOpcoes: "ul.lb-select-options",
    seletorInput: "input",
    seletorItemOpcao: ".md-option",
    classeMostrar: "show"
});

