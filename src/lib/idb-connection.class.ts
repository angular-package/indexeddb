// Type.
import { IDBStoreParameters } from './type/idb-store-parameters.type';

/**
 * 
 */
export class IDBConnection<
  Name extends string = string,
  StoreName extends string | number | symbol = string,
  Version extends number = number
> {
  /**
   * 
   */
  public get db(): IDBDatabase {
    return this.#db;
  }

  /**
   * 
   */
  public get name(): Name {
    return this.#db.name as Name;
  }

  /**
   * 
   */
  public get request(): IDBOpenDBRequest {
    return this.#request;
  }

  /**
   * 
   */
  public get store(): IDBStoreParameters<StoreName> | undefined {
    return this.#store;
  }

  /**
   * 
   */
  public get storeNames(): StoreName | StoreName[] {
    return this.#storeNames;
  }

  /**
   * 
   */
  #db!: IDBDatabase;

  /**
   * 
   */
  #request!: IDBOpenDBRequest;

  /**
   * 
   */
  #store?: IDBStoreParameters<StoreName>;

  /**
   * 
   */
  #storeNames: StoreName | StoreName[];

  /**
   * 
   * @param name 
   * @param storeNames 
   * @param store 
   * @param version 
   */
  constructor(
    name: Name,
    storeNames: StoreName | StoreName[],
    store?: IDBStoreParameters<StoreName>,
    version: Version = 1 as any,
  ) {
    this.#store = store;
    this.#storeNames = storeNames;

    if (!this.#request) {
      // Request open database.
      this.#request = window.indexedDB.open(name, version);

      // Database successfully opened.
      this.#request.addEventListener(
        'success',
        (ev: any) => (
          this.#db = ev.target.result,
          console.log(`Database ${this.#db.name} opened successfully with store ${this.#storeNames.valueOf() as string}`)
        ),
        true
      );

      // On upgrade needed.
      store && this.onupgradeneeded(store);
    }
  }

  /**
   * 
   * @param store 
   * @returns 
   */
  public onupgradeneeded(store: IDBStoreParameters<StoreName>): this {
    this.#request.addEventListener('upgradeneeded', (e: any) => (
      // Grab a reference to the opened database.
      this.#db = e.target.result as IDBDatabase,

      // Create store.
      this.createObjectStore(store),

      // Log.
      console.log('Database setup complete')
    ));
    return this;
  }

  /**
   * Create an objectStore to store data.
   * @param store 
   * @param db 
   * @returns 
   */
  public createObjectStore(
    store: IDBStoreParameters<StoreName>,
    db: IDBDatabase = this.#db
  ) {
    typeof store === 'object' &&
      Object.keys(store).forEach((objectStoreName) => {
        const objectStore = db.createObjectStore(
          objectStoreName,
          store[objectStoreName as StoreName]
        );
        store[objectStoreName as StoreName].index?.forEach((index) =>
          objectStore.createIndex(index.name, index.keyPath, index.options)
        );
      });
    return this;
  }
}
