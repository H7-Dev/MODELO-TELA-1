document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.div-main-app');

    // Função para verificar se o usuário está logado
    const isUserLoggedIn = () => sessionStorage.getItem('isLoggedIn') === '1';

    // Função para verificar a autenticação antes de carregar a página
    const verifyAuthAndLoadPage = (page) => {
        if (!isUserLoggedIn() && page !== 'login') {
            loadPage('login');
        } else if (isUserLoggedIn() && page === 'login') {
            loadPage('home');
        } else {
            loadPage(page);
        }
    };

    // Função para carregar páginas HTML dinamicamente
    const loadPage = async (page) => {
        try {
            const response = await fetch(`PAGES/${page}.html`);
            if (!response.ok) throw new Error('Página não encontrada');
            const html = await response.text();
            mainContainer.innerHTML = html;

            if (page === 'login') {
                setupLoginForm();
                setupTestButton(); // Configura o botão testar na página de login
            } else if (page === 'home') {
                setupLogoutButton();
            }
            window.history.pushState({ page }, '', `#${page}`);
        } catch (error) {
            mainContainer.innerHTML = '<p>Erro ao carregar a página.</p>';
        }
    };

    // Função para configurar o formulário de login
    const setupLoginForm = () => {
        const loginForm = document.querySelector('#loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.querySelector('#username').value;
                const password = document.querySelector('#password').value;

                if (username === 'admin' && password === '1234') {
                    sessionStorage.setItem('isLoggedIn', '1');
                    verifyAuthAndLoadPage('home');
                } else {
                    alert('Credenciais inválidas');
                }
            });
        }
    };

    // Função para configurar o botão de logout
    const setupLogoutButton = () => {
        const logoutButton = document.querySelector('#logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.setItem('isLoggedIn', '0');
                verifyAuthAndLoadPage('login');
            });
        }
    };

    // Função para configurar o botão testar
    const setupTestButton = () => {
        const testButton = document.querySelector('#testar');
        if (testButton) {
            testButton.addEventListener('click', () => {
                sessionStorage.setItem('isLoggedIn', '1');
                alert('Sessão definida como logado');
                verifyAuthAndLoadPage('home');
            });
        }
    };

    // Navegação entre páginas sem recarregar o site
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-page]');
        if (link) {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            verifyAuthAndLoadPage(page);
        }
    });

    // Lidar com o botão de voltar e avançar do navegador
    window.addEventListener('popstate', (e) => {
        const page = e.state?.page || 'login';
        verifyAuthAndLoadPage(page);
    });

    // Carregar a página inicial ou a partir da URL
    const initialPage = window.location.hash.replace('#', '') || 'login';
    verifyAuthAndLoadPage(initialPage);
});
