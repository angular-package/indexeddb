// RxJS.
import { from } from 'rxjs';

// Type.
import { IDBStore } from './type/indexeddb-store.type';

export class IndexedDB<
  Name extends string = string,
  StoreNames extends string = string,
  Version extends number = number
> {

  public static store: <StoreNames extends string>(store: IDBStore<StoreNames>) => IDBStore<StoreNames> =
    <StoreNames extends string>(store: IDBStore<StoreNames>) => store;

  /**
   * Property to IDBDatabase.
   */
  public get db(): IDBDatabase {
    return this.#db;
  }

  /**
   * Database name.
   */
  public get name(): Name {
    return this.#db.name as Name;
  }

  /**
   * Property to Open Request.
   */
  public get request(): IDBOpenDBRequest {
    return this.#request;
  }

  // Database.
  #db!: IDBDatabase;

  // Open Request.
  #request!: IDBOpenDBRequest;

  // Store configuration.
  #store: IDBStore<StoreNames>;

  // Store names.
  #storeNames: StoreNames;

  /**
   * 
   * @param name 
   * @param store 
   * @param storeName 
   * @param version 
   */
  constructor(
    name: Name,
    store: IDBStore<StoreNames>,
    storeName: StoreNames,
    version: Version
  ) {
    this.#store = store;
    this.#storeNames = storeName;

    // Request open database.
    this.#request = window.indexedDB.open(name, version);

    // Database opened.
    this.onOpenSuccess((db, request, ev: any) => {
      this.#db = ev.target.result;
      console.log(`Database ${this.#db.name} opened successfully with store ${this.#storeNames.valueOf() as string}`)
    });

    // On upgrade needed.
    this.onUpgradeNeeded(store);

    // On success assign db.
    this.#request.onsuccess = () => {
      console.log(`Request success`);
      this.#db = this.#request.result;
    };
  }

  /**
   * 
   * @param name 
   * @param value 
   * @param key 
   * @param onSuccess 
   * @param onError 
   * @param mode 
   * @returns 
   */
  public add(
    value: any,
    key?: IDBValidKey,
    onSuccess?: (
      result: any,
      request: IDBRequest<IDBValidKey>,
      ev: Event
    ) => any,
    onError?: (this: IDBRequest<IDBValidKey>, ev: Event) => any,
    name: StoreNames = this.#storeNames,
    mode: IDBTransactionMode = "readwrite",
  ): this {
    return this.objectStore(
      store => {
        const request = store.add(value, key);

        // On error.
        typeof onError === 'function' && (request.onerror = onError);

        // On success.
        typeof onSuccess === 'function' &&
          (request.onsuccess = (ev: any) =>
            onSuccess(ev.target.result, request, ev));
      },
      undefined,
      undefined,
      undefined,
      name,
      mode
    );
  }

  /**
   * 
   * @param value 
   * @param key 
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param name 
   * @param mode 
   * @returns 
   */
  public addMultiple(
    value: any[],
    key?: IDBValidKey,
    onSuccess?: (
      result: any,
      request: IDBRequest<IDBValidKey>,
      ev: Event
    ) => any,
    onError?: (this: IDBRequest<IDBValidKey>, ev: Event) => any,
    onComplete?: () => void,
    name: StoreNames = this.#storeNames,
    mode: IDBTransactionMode = "readwrite"
  ): this {
    from(value).subscribe({
      next: value => this.add(value, key, onSuccess, onError, name, mode),
      complete: onComplete,
      error: err => {}
    })
    return this;
  }

  /**
   * 
   * @param store 
   * @returns 
   */
  public createObjectStore(store: IDBStore, db: IDBDatabase = this.#db) {
    // Create an objectStore to store data.
    typeof store === 'object' &&
      Object.keys(store).forEach((objectStoreName) => {
        console.log(`Store name`, objectStoreName, );
        const objectStore = db.createObjectStore(
          objectStoreName,
          store[objectStoreName]
        );

        store[objectStoreName].index?.forEach((index) => objectStore.createIndex(index.name, index.keyPath, index.options));
      });
    return this;
  }

  /**
   * 
   * @param query 
   * @param onSuccess 
   * @param onError 
   * @param name 
   * @param mode 
   * @returns 
   */
  public get(
    query: IDBValidKey | IDBKeyRange,
    onSuccess?: (result: any, request: IDBRequest<any>, ev: Event) => any,
    onError?: (this: IDBRequest<any>, ev: Event) => any,
    name: StoreNames = this.#storeNames,
    mode: IDBTransactionMode = "readonly"
  ): this {
    return this.objectStore(
      store => {
        const request = store.get(query);

        // On error.
        typeof onError === 'function' && (request.onerror = onError);

        // On success.
        request.onsuccess = (ev: any) =>
          typeof onSuccess === 'function' && onSuccess(ev.target.result, request, ev);
      },
      undefined,
      undefined,
      undefined,
      name,
      mode
    );
  }

  /**
   * 
   * @param query 
   * @param count 
   * @param onSuccess 
   * @param onComplete 
   * @param onAbort 
   * @param onError 
   * @param name 
   * @param mode 
   * @returns 
   */
  public getAll(
    query?: IDBValidKey | IDBKeyRange,
    count?: number,
    onSuccess?: (result: any, request: IDBRequest<any>, ev: Event) => any,
    onComplete?: (this: IDBTransaction, ev: Event) => any,
    onAbort?: (this: IDBTransaction, ev: Event) => any,
    onError?: ((this: IDBRequest<any[]>, ev: Event) => any) | null,
    name: StoreNames = this.#storeNames,
    mode: IDBTransactionMode = "readonly"
  ): this {
    return this.objectStore(
      store => {
        const request = store.getAll(query, count);

        // On error.
        typeof onError === 'function' && (request.onerror = onError);

        // On success.
        request.onsuccess = (ev: any) =>
          typeof onSuccess === 'function' && onSuccess(ev.target.result, request, ev);
      },
      onComplete,
      onAbort,
      ev => { console.log(`transaction error`) },
      name,
      mode
    );
  }

  /**
   * Get object of store name in mode.
   * @param name 
   * @param onComplete 
   * @param onAbort 
   * @param onError 
   * @param mode 
   * @returns The returned value is an object store.
   */
  public objectStore(
    onSuccess?: (store: IDBObjectStore, transaction: IDBTransaction) => any,
    onComplete?: (this: IDBTransaction, ev: Event) => any,
    onAbort?: (this: IDBTransaction, ev: Event) => any,
    onError?: (this: IDBTransaction, ev: Event) => any,
    name: StoreNames = this.#storeNames,
    mode?: IDBTransactionMode
  ): this {
    return this.transaction(
      transaction => {
        typeof onSuccess === 'function'
          && onSuccess(transaction.objectStore(name), transaction);
      },
      onComplete,
      onAbort,
      onError,
      name,
      mode
    );
  }

  /**
   *
   * @param onOpenSuccess
   * @returns
   * @angularpackage
   */
  public onOpenSuccess(
    onOpenSuccess: (
      db: IndexedDB<Name, StoreNames, Version>,
      openRequest: IDBOpenDBRequest,
      ev: Event
    ) => any
  ): this {
    this.#request.addEventListener(
      'success',
      (ev) => onOpenSuccess(this, this.#request, ev),
      true
    );
    return this;
  }

  /**
   * 
   * @param store 
   * @returns 
   * @angularpackage
   */
  public onUpgradeNeeded(store: IDBStore): this {
    this.#request.addEventListener('upgradeneeded', (e: any) => {
      // Grab a reference to the opened database.
      this.#db = e.target.result;

      // Create store.
      this.createObjectStore(store);

      // Log.
      console.log('Database setup complete');
    });

    return this;
  }

  /**
   * Put value in specified key and store.
   * @param value 
   * @param key 
   * @param onSuccess 
   * @param onError 
   * @param name 
   * @param mode 
   * @returns This instance.
   * @angularpackage
   */
  public put(
    value: any,
    key?: IDBValidKey,
    onSuccess?: (result: any, request: IDBRequest<IDBValidKey>, ev: Event) => any,
    onError?: (this: IDBRequest<IDBValidKey>, ev: Event) => any,
    name: StoreNames = this.#storeNames,
    mode: IDBTransactionMode = "readwrite"
  ): this {
    this.objectStore((store, transaction) => {
        const request = store.put(value, key);
        typeof onError === 'function' && (request.onerror = onError);
        request.onsuccess = (ev: any) => typeof onSuccess === 'function' && onSuccess(ev.target.result, request, ev);
      },
      undefined,
      undefined,
      undefined,
      name,
      mode
    );
    return this;
  }

  /**
   * Get transaction object in database in success, complete, abort, and error handlers of store name in specified mode.
   * @param onComplete 
   * @param onAbort 
   * @param onError 
   * @param storeName 
   * @param mode 
   * @returns This instance.
   */
  public transaction(
    onSuccess?: (transaction: IDBTransaction) => any,
    onComplete?: (this: IDBTransaction, ev: Event) => any,
    onAbort?: (this: IDBTransaction, ev: Event) => any,
    onError?: (this: IDBTransaction, ev: Event) => any,
    storeName: StoreNames = this.#storeNames,
    mode: IDBTransactionMode = "readonly"
  ): this {
    this.#db ?
      this.#transaction(
        this.#db.transaction(storeName as string, mode),
        onSuccess,
        onComplete,
        onAbort,
        onError
      )
      :
      this.#request.onsuccess = (ev: any) =>
        this.#transaction(
          ev.target.result.transaction(storeName as string, mode),
          onSuccess,
          onComplete,
          onAbort,
          onError
        );
    return this;
  }

  /**
   * Method to handle handlers.
   * @param transaction IDBTransaction 
   * @param onSuccess On success handler of function type.
   * @param onComplete On complete handler of function type.
   * @param onAbort On abort handler of function type.
   * @param onError On error handler of function type.
   * @returns This instance.
   */
  #transaction(
    transaction: IDBTransaction,
    onSuccess?: (transaction: IDBTransaction) => any,
    onComplete?: (this: IDBTransaction, ev: Event) => any,
    onAbort?: (this: IDBTransaction, ev: Event) => any,
    onError?: (this: IDBTransaction, ev: Event) => any,
  ): this {
    if (transaction) {
      typeof onSuccess === 'function' && onSuccess(transaction);
      typeof onComplete === 'function' && (transaction.oncomplete = onComplete);
      typeof onAbort === 'function' && (transaction.onabort = onAbort);
      typeof onError === 'function' && (transaction.onerror = onError);
    }
    return this;
  }
}
