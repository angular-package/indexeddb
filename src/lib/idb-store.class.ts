// RxJS.
import { of, Subscription } from 'rxjs';

// Class.
import { IDBData } from './idb-data.class';

// Type.
import { IDBStoreParameters } from './type/idb-store-parameters.type';

/**
 * 
 */
export class IDBStore<
  StoreSchema extends object,
  Name extends string = string,
  StoreName extends keyof StoreSchema = keyof StoreSchema,
  Version extends number = number,
> {
  /**
   * 
   */
  public get connection() {
    return this.#database.connection;
  }

  /**
   * 
   */
  public get database() {
    return this.#database;
  }

  /**
   * 
   */
  #database!: IDBData<Name, StoreName, Version>;

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
    version: Version = 1 as any
  ) {
    this.#database = new IDBData(name, storeNames, store, version);
  }

  /**
   * 
   * @param storeName 
   * @param value 
   * @param key 
   * @param onsuccess 
   * @param onerror 
   * @param transaction 
   * @param complete 
   * @param error 
   * @param storeNames 
   * @param mode 
   * @returns 
   */
  public add<Name extends StoreName>(
    storeName: StoreName,
    value: StoreSchema[Name] | StoreSchema[Name][],
    key?: IDBValidKey,

    // Request.
    onsuccess?: <Result>(result: Result, request: IDBRequest<IDBValidKey>, transaction: IDBTransaction, ev: Event) => any,
    onerror?: (this: IDBRequest<IDBValidKey>, ev: Event) => any,

    // Transaction.
    transaction?: Partial<{
      onsuccess: (store: IDBObjectStore, transaction: IDBTransaction) => any,
      oncomplete: (this: IDBTransaction, ev: Event) => any,
      onabort: (this: IDBTransaction, ev: Event) => any,
      onerror: (this: IDBTransaction, ev: Event) => any,
    }>,

    // Subscribe.
    complete?: () => void,
    error?: (err: any) => void,

    // Store.
    storeNames: StoreName | StoreName[] = this.#database.connection.storeNames,
    mode: IDBTransactionMode = "readwrite"
  ): this {
    this.#promise((resolve, reject, subscription) => (
      subscription.add(
        of(value).subscribe({
          next: value => this.#add(
            storeName,
            value as any,
            key,
            onsuccess,
            onerror,
            transaction,
            storeNames,
            mode
          ),
          complete: (resolve(subscription), complete),
          error: err => (resolve(subscription), reject(err), typeof error === 'function' && error(err), err)
        }),
      ),
      subscription
    ));
    return this;
  }

  /**
   * 
   * @param storeName 
   * @param query 
   * @param onsuccess 
   * @param onerror 
   * @param transaction 
   * @param storeNames 
   * @param mode 
   * @returns 
   */
  public get(
    storeName: StoreName,
    query: IDBValidKey | IDBKeyRange,

    // Request.
    onsuccess?: (result: any, request: IDBRequest<any>, ev: Event) => any,
    onerror?: (this: IDBRequest<any>, ev: Event) => any,

    // Transaction.
    transaction?: Partial<{
      onsuccess: (store: IDBObjectStore, transaction: IDBTransaction) => any,
      oncomplete: (this: IDBTransaction, ev: Event) => any,
      onabort: (this: IDBTransaction, ev: Event) => any,
      onerror: (this: IDBTransaction, ev: Event) => any,
    }>,

    // Store.
    storeNames: StoreName | StoreName[] = this.#database.connection.storeNames,
    mode: IDBTransactionMode = "readonly"
  ): this {
    this.#database.objectStore(
      storeName,
      store => {
        const request = store.get(query);

        // On error.
        typeof onerror === 'function' && (request.onerror = onerror);

        // On success.
        request.onsuccess = (ev: any) =>
          typeof onsuccess === 'function' && onsuccess(ev.target.result, request, ev);
      },
      transaction?.oncomplete,
      transaction?.onabort,
      transaction?.onerror,
      storeNames,
      mode
    );
    return this;
  }

  /**
   * 
   * @param storeName 
   * @param query 
   * @param count 
   * @param onsuccess 
   * @param onerror 
   * @param transaction 
   * @param storeNames 
   * @param mode 
   * @returns 
   */
  public getAll(
    storeName: StoreName,
    query?: IDBValidKey | IDBKeyRange,
    count?: number,

    // Request.
    onsuccess?: (result: any, request: IDBRequest<any>, ev: Event) => any,
    onerror?: ((this: IDBRequest<any[]>, ev: Event) => any) | null,

    // Transaction.
    transaction?: Partial<{
      onsuccess: (store: IDBObjectStore, transaction: IDBTransaction) => any,
      oncomplete: (this: IDBTransaction, ev: Event) => any,
      onabort: (this: IDBTransaction, ev: Event) => any,
      onerror: (this: IDBTransaction, ev: Event) => any,
    }>,

    // Store.
    storeNames: StoreName | StoreName[] = this.#database.connection.storeNames,
    mode: IDBTransactionMode = "readonly"
  ): this {
    this.#database.objectStore(
      storeName,
      store => {
        const request = store.getAll(query, count);

        // On error.
        typeof onerror === 'function' && (request.onerror = onerror);

        // On success.
        request.onsuccess = (ev: any) =>
          typeof onsuccess === 'function' && onsuccess(ev.target.result, request, ev);
      },
      transaction?.oncomplete,
      transaction?.onabort,
      transaction?.onerror,
      storeNames,
      mode
    );
    return this;
  }


  /**
   * 
   */
  public openCursor(
    storeName: StoreName,
    query?: IDBValidKey | IDBKeyRange | null,
    direction?: IDBCursorDirection,

    // Request.
    onsuccess?: (this: IDBRequest<IDBCursorWithValue | null>, ev: Event) => any | null,
    onerror?: (this: IDBRequest<IDBCursorWithValue | null>, ev: Event) => any | null,

    // Transaction.
    transaction?: Partial<{
      onsuccess: (store: IDBObjectStore, transaction: IDBTransaction) => any,
      oncomplete: (this: IDBTransaction, ev: Event) => any,
      onabort: (this: IDBTransaction, ev: Event) => any,
      onerror: (this: IDBTransaction, ev: Event) => any,
    }>,

    // Store.
    storeNames: StoreName | StoreName[] = this.#database.connection.storeNames,
    mode?: IDBTransactionMode
  ): this {
    this.#database.objectStore(
      storeName,
      store => {
        const request = store.openCursor(query, direction);
        typeof onsuccess === 'function' && (request.onsuccess = onsuccess);
        typeof onerror === 'function' && (request.onerror = onerror);
      },
      transaction?.oncomplete,
      transaction?.onabort,
      transaction?.onerror,
      storeNames,
      mode
    );
    return this;
  }

  /**
   * 
   * @param storeName 
   * @param value 
   * @param key 
   * @param onsuccess 
   * @param onerror 
   * @param transaction 
   * @param storeNames 
   * @param mode 
   * @returns 
   */
  public put(
    storeName: StoreName,
    value: any,
    key?: IDBValidKey,

    // Request.
    onsuccess?: <Result>(result: Result, transaction: IDBTransaction, ev: Event) => any,
    onerror?: (this: IDBRequest<IDBValidKey>, ev: Event) => any,

    // Transaction.
    transaction?: Partial<{
      onsuccess: (store: IDBObjectStore, transaction: IDBTransaction) => any,
      oncomplete: (this: IDBTransaction, ev: Event) => any,
      onabort: (this: IDBTransaction, ev: Event) => any,
      onerror: (this: IDBTransaction, ev: Event) => any,
    }>,

    // Store.
    storeNames: StoreName | StoreName[] = this.#database.connection.storeNames,
    mode: IDBTransactionMode = "readwrite"
  ): this {
    this.#database.objectStore(storeName, (store, transaction) => {
        const request = store.put(value, key);
        typeof onerror === 'function' && (request.onerror = onerror);
        typeof onsuccess === 'function' && (request.onsuccess = (ev: any) => onsuccess(ev.target.result, transaction, ev));
      },
      transaction?.oncomplete,
      transaction?.onabort,
      transaction?.onerror,
      storeNames,
      mode
    );
    return this;
  }

  /**
   * 
   * @param storeName 
   * @param value 
   * @param key 
   * @param onsuccess 
   * @param onerror 
   * @param transaction 
   * @param storeNames 
   * @param mode 
   * @returns 
   */
  #add<Name extends StoreName>(
    storeName: Name,
    value: StoreSchema[Name],
    key?: IDBValidKey,

    // Request.
    onsuccess?: <Result>(result: Result, request: IDBRequest<IDBValidKey>, transaction: IDBTransaction, ev: Event) => any,
    onerror?: (this: IDBRequest<IDBValidKey>, ev: Event) => any,

    // Transaction.
    transaction?: Partial<{
      onsuccess: (store: IDBObjectStore, transaction: IDBTransaction) => any,
      oncomplete: (this: IDBTransaction, ev: Event) => any,
      onabort: (this: IDBTransaction, ev: Event) => any,
      onerror: (this: IDBTransaction, ev: Event) => any,
    }>,

    // Store.
    storeNames: StoreName | StoreName[] = this.#database.connection.storeNames,
    mode: IDBTransactionMode = "readwrite",
  ): this {
    this.#database.objectStore(
      storeName,
      (store, transaction) => {
        const request = store.add(value, key);

        // On error.
        typeof onerror === 'function' && (request.onerror = onerror);

        // On success.
        typeof onsuccess === 'function' &&
          (request.onsuccess = (ev: any) =>
            onsuccess(ev.target.result, request, transaction, ev));
      },
      transaction?.oncomplete,
      transaction?.onabort,
      transaction?.onerror,
      storeNames,
      mode
    );
    return this;
  }

  /**
   * 
   * @param executor 
   * @returns 
   */
  #promise(
    executor: (
      resolve: (value: Subscription | PromiseLike<Subscription>) => void,
      reject: (reason?: any) => void,
      subscription: Subscription
    ) => Subscription
  ): this {
    new Promise<Subscription>((resolve, reject) => executor(resolve, reject, new Subscription()))
      .then(subscription => subscription.unsubscribe())
      .catch(() => { })
      .finally();
    return this;
  }
}

