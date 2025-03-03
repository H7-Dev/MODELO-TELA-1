// IndexedDB Adaptation for `tb_contas` table
const DB_NAME = 'db_controller_estoque';
const DB_VERSION = 1;
const STORE_NAME = 'tb_contas';

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'idConta', autoIncrement: true });
                store.createIndex('idx_c_conta', 'c_conta', { unique: true });
                store.createIndex('idx_c_email', 'c_email', { unique: true });
                store.createIndex('idx_status', 'c_status', { unique: false });
                store.createIndex('idx_ultimoAcesso', 'c_ultimoAcesso', { unique: false });
                store.createIndex('idx_idReferencia', 'c_idReferencia', { unique: false });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

// Função para carregar páginas dinamicamente
const verifyAuthAndLoadPage = (page) => {
    if (sessionStorage.getItem('isLoggedIn') === '1' && page === 'login') {
        window.location.href = '#home';
    } else if (!sessionStorage.getItem('isLoggedIn') && page !== 'login') {
        window.location.href = '#login';
    } else {
        window.location.href = `#${page}`;
    }
};

// Validate email and password on login button click
document.body.addEventListener('click', async (event) => {
    if (event.target.closest('button.btn-entrar')) {
        const emailInput = document.getElementById('in_email');
        const passwordInput = document.getElementById('in_password');
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert('Preencha o email e a senha.');
            return;
        }

        const db = await openDatabase();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('idx_c_email');

        const request = index.get(email);
        request.onsuccess = (event) => {
            const user = event.target.result;
            if (user && user.c_senha === password) {
                sessionStorage.setItem('isLoggedIn', '1');
                verifyAuthAndLoadPage('home');
            } else {
                alert('Email ou senha inválidos.');
            }
        };

        request.onerror = () => {
            alert('Erro ao buscar o usuário no banco de dados.');
        };
    }
});

