const VERSION_INDEXED_DB = 2;

export default class ProviderIndexedDB {
    constructor(dbName) {
        this.dbName = dbName;
        this.dbStoreName = 'storage';
        this.isConnected = false;
        this.db = null;
    }

    connection() {
        const request = indexedDB.open(this.dbName, VERSION_INDEXED_DB);

        return new Promise((resolve, reject) =>  {
            if (this.isConnected) {
                resolve(this.db);
            } else {
                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    this.isConnected = true;
                    resolve(this.db);

                    console.info('Connection Success');
                };

                request.onerror = (event) => {
                    this.isConnected = false;
                    reject(event);

                    console.error('Connection Fail');
                };

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    db.createObjectStore(this.dbStoreName, { keyPath: "id" });

                    console.log('UpgradeNeeded Success');
                };
            }
        });
    }

    getStore(db, type) {
        const transaction = db.transaction([this.dbStoreName], type);
        return transaction.objectStore(this.dbStoreName);
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.connection().then((db) => {
                const request = this.getStore(db, "readonly").get(id);

                request.onsuccess = (event) => {
                    let result = event.target.result;
                    resolve(result);

                    console.info('Get Success');
                };

                request.onerror = () => {
                    reject();

                    console.error('Get Fail');
                };
            });
        });
    }

    put(id, payload) {
        this.connection().then((db) => {
            const request = this.getStore(db, "readwrite").put({ id, payload });

            request.onsuccess = () => {
                console.info('Put Success');
            };

            request.onerror = () => {
                console.error('Put Fail');
            };
        });
    }

    clear() {
        return new Promise((resolve, reject) => {
            this.connection().then((db) => {
                const request = this.getStore(db, "readwrite").clear();

                request.onsuccess = () => {
                    this.isConnected = false;
                    this.db = null;
                    resolve();
                    console.info('Clear Success');
                };

                request.onerror = () => {
                    reject();
                    console.error('Clear Fail');
                };
            });
        });
    }
}