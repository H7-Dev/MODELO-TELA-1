class GlobalKeyF1 {
    constructor() {
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.isBlocking = false;
        this.enable(); // Ativa o bloqueio da tecla F1 e foca no input#in_search
    }

    handleKeyDown(event) {
        if (event.key === 'F1') {
            event.preventDefault(); // Impede a ação padrão do navegador
            event.stopImmediatePropagation(); // Bloqueia qualquer outro listener que possa capturar o evento
            const searchInput = document.getElementById('in_search');
            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                    if (searchInput.value) {
                        searchInput.select(); // Seleciona todo o texto se houver
                    }
                    // Atualiza data-hotkey dos elementos
                    document.querySelectorAll('[data-hotkey]').forEach(el => el.setAttribute('data-hotkey', '0'));
                    const docaLeft = document.querySelector('div.doca-left');
                    if (docaLeft) {
                        docaLeft.setAttribute('data-hotkey', '1');
                    }
                }, 0);
                console.log('Tecla F1 pressionada: foco no input#in_search.');
            }
        }
    }

    enable() {
        if (!this.isBlocking) {
            window.addEventListener('keydown', this.handleKeyDown, { capture: true }); // Usa a fase de captura para interceptar primeiro
            this.isBlocking = true;
        }
    }

    disable() {
        if (this.isBlocking) {
            window.removeEventListener('keydown', this.handleKeyDown, { capture: true });
            this.isBlocking = false;
        }
    }
}

// Instância da classe
const globalKeyF1 = new GlobalKeyF1();
