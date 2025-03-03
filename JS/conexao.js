console.log('IndexedDBHelper')
class IndexedDBHelper {
    constructor(databaseName = 'db_controller_estoque', version = 1) {
        this.databaseName = databaseName;
        this.version = version;
        this.db = null;
        console.log(`IndexedDBHelper inicializado: ${this.databaseName}, versão: ${this.version}`);
    }

    async connect(stores = []) {
        console.log(`Conectando ao banco de dados: ${this.databaseName}`);
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.databaseName, this.version);

            request.onupgradeneeded = (event) => {
                console.log('Atualizando banco de dados...');
                const db = event.target.result;
                stores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        console.log(`Criando objectStore: ${store.name}`);
                        const objectStore = db.createObjectStore(store.name, { keyPath: store.keyPath, autoIncrement: store.autoIncrement });
                        if (store.indices) {
                            store.indices.forEach(index => {
                                console.log(`Criando índice: ${index.name} em ${store.name}`);
                                objectStore.createIndex(index.name, index.keyPath, { unique: index.unique });
                            });
                        }
                    }
                });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Conexão estabelecida com sucesso.');
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('Erro ao conectar ao banco de dados:', event.target.error);
                reject(`Erro ao conectar ao banco de dados: ${event.target.error}`);
            };
        });
    }

    async writeData(storeName, data) {
        console.log(`Escrevendo dados na store: ${storeName}`, data);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => {
                console.log('Dados inseridos com sucesso.');
                resolve(true);
            };
            request.onerror = () => {
                console.error('Erro ao inserir dados na store:', storeName);
                reject('Erro ao inserir dados');
            };
        });
    }

    async readData(storeName, key) {
        console.log(`Lendo dados da store: ${storeName}, chave: ${key}`);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = (event) => {
                console.log('Dados lidos com sucesso:', event.target.result);
                resolve(event.target.result);
            };
            request.onerror = () => {
                console.error('Erro ao ler dados da store:', storeName);
                reject('Erro ao ler dados');
            };
        });
    }

    async readAllData(storeName) {
        console.log(`Lendo todos os dados da store: ${storeName}`);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = (event) => {
                console.log('Todos os dados lidos com sucesso:', event.target.result);
                resolve(event.target.result);
            };
            request.onerror = () => {
                console.error('Erro ao ler todos os dados da store:', storeName);
                reject('Erro ao ler todos os dados');
            };
        });
    }

    async updateData(storeName, data) {
        console.log(`Atualizando dados na store: ${storeName}`, data);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => {
                console.log('Dados atualizados com sucesso.');
                resolve(true);
            };
            request.onerror = () => {
                console.error('Erro ao atualizar dados na store:', storeName);
                reject('Erro ao atualizar dados');
            };
        });
    }

    async deleteData(storeName, key) {
        console.log(`Deletando dados da store: ${storeName}, chave: ${key}`);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => {
                console.log('Dados deletados com sucesso.');
                resolve(true);
            };
            request.onerror = () => {
                console.error('Erro ao deletar dados da store:', storeName);
                reject('Erro ao deletar dados');
            };
        });
    }

    async queryData(storeName, indexName, queryValue) {
        console.log(`Consultando dados na store: ${storeName}, índice: ${indexName}, valor: ${queryValue}`);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(queryValue);

            request.onsuccess = (event) => {
                console.log('Consulta realizada com sucesso:', event.target.result);
                resolve(event.target.result);
            };
            request.onerror = () => {
                console.error('Erro ao consultar dados na store:', storeName);
                reject('Erro ao consultar dados');
            };
        });
    }
    
}


