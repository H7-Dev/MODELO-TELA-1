
// class AuthHelper extends IndexedDBHelper {
//     constructor() {
//         super('meuBanco', 1);
//     }

//     /**
//      * Inicializa a conexão com o banco de dados e garante que a store `tb_contas` exista.
//      */
//     async init() {
//         await this.connect([
//             {
//                 name: 'tb_contas',
//                 keyPath: 'id',
//                 autoIncrement: true,
//                 indices: [
//                     { name: 'email', keyPath: 'email', unique: true },
//                     { name: 'senha', keyPath: 'senha', unique: false }
//                 ]
//             }
//         ]);
//     }

//     /**
//      * Valida as credenciais de login verificando o e-mail e a senha no banco de dados.
//      * @param {string} email - O e-mail do usuário.
//      * @param {string} senha - A senha do usuário.
//      * @returns {Promise<object|null>} - Retorna o objeto do usuário se as credenciais forem válidas, caso contrário retorna null.
//      */
//     async validarLogin(email, senha) {
//         try {
//             await this.init(); // Garante que o banco esteja inicializado

//             const usuarios = await this.queryData('tb_contas', 'email', email);

//             if (usuarios && usuarios.length > 0) {
//                 const usuario = usuarios.find(user => user.senha === senha);
//                 if (usuario) {
//                     return usuario;
//                 }
//             }

//             return null;
//         } catch (error) {
//             console.error('Erro ao validar o login:', error);
//             return null;
//         }
//     }
// }
// const auth = new AuthHelper();

// (async () => {
//     // Inicializa o banco de dados e a store `tb_contas`
//     await auth.init();

//     // Inserindo um exemplo de conta (apenas para demonstração)
//     await auth.writeData('tb_contas', { email: 'usuario@exemplo.com', senha: '123456', nome: 'João' });

//     // Tentativa de login
//     const usuario = await auth.validarLogin('usuario@exemplo.com', '123456');

//     if (usuario) {
//         console.log('Login bem-sucedido!', usuario);
//     } else {
//         console.log('Credenciais inválidas.');
//     }
// })();
