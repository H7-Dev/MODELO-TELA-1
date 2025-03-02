document.addEventListener('DOMContentLoaded', () => {
    // Função para verificar o status do login
    const checkAuth = () => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') || '0';

        if (isLoggedIn === '0') {
            // Usuário não está logado, redirecionar para a página de login
            window.location.href = '#login';
        } else if (isLoggedIn === '1') {
            // Usuário está logado, redirecionar para a página inicial
            window.location.href = '#home';
        }
    };

    checkAuth();
});
