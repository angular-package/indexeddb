import { of } from 'rxjs';

// Class.
import { IDBStore } from './idb-store.class';

// Type.
import { IDBQueryAdd } from './type/query/idb-query-add.type';
import { IDBQueryGet } from './type/query/idb-query-get.type';
import { IDBQueryGetAll } from './type/query/idb-query-get-all.type';
import { IDBQueryInput } from './type/query/idb-query-input.type';
import { IDBQueryOpenCursor } from './type/query/idb-query-open-cursor.type';
import { IDBQueryPut } from './type/query/idb-query-put.type';

// Interface.
import { IDBConfig } from './interface/idb-config.interface';

/**
 * 
 */
export class IDBQuery<
  StoreSchema extends object,
  Name extends string = string,
  StoreName extends keyof StoreSchema = keyof StoreSchema,
  Version extends number = number
> {
  /**
   * 
   */
  public get connection() {
    return this.#store.connection;
  }

  /**
   * 
   */
  public get store(): IDBStore<StoreSchema, Name, StoreName, Version> {
    return this.#store;
  }

  /**
   * 
   */
  #store!: IDBStore<StoreSchema, Name, StoreName, Version>;

  /**
   * 
   * @param name 
   * @param storeNames 
   * @param store 
   * @param version 
   */
  constructor(
    query?: IDBQueryInput<StoreSchema, StoreName>,
    config?: IDBConfig<Name, StoreName, Version>,
  ) {
    if (config) {
      this.#store = new IDBStore(
        config.name,
        config.storeNames,
        config.store,
        config.version
      );
    }
    query && this.execute(query);
  }

  /**
   * 
   */
  public execute(
    query: IDBQueryInput<StoreSchema, StoreName>,
  ): this {
    of(query).subscribe(
      query => {
        this.eachMethod(query, method => {
          if (method === 'add') {
            if (query[method]) {
              Object
                .entries<IDBQueryAdd<StoreName, StoreSchema, StoreName>>(query[method] as any)
                .forEach((([store, query]) => this.#add({
                  ...{storeName: store as StoreName},
                  ...query
                })));
            }
          }

          if (method === 'get') {
            if (query[method]) {
              Object
                .entries<IDBQueryGet<StoreName>>(query[method] as any)
                .forEach((([store, query]) => this.#get({
                  ...{storeName: store as StoreName},
                  ...query
                })));
            }
          }

          if (method === 'getAll') {
            if (query[method]) {
              Object
                .entries<IDBQueryGetAll<StoreName>>(query[method] as any)
                .forEach((([store, query]) => this.#getAll({
                  ...{storeName: store as StoreName},
                  ...query
                })));
            }
          }

          if (method === 'openCursor') {
            if (query[method]) {
              Object
                .entries<IDBQueryOpenCursor<StoreName>>(query[method] as any)
                .forEach((([store, query]) => this.#openCursor({
                  ...{storeName: store as StoreName},
                  ...query
                })));
            }
          }

          if (method === 'put') {
            if (query[method]) {
              Object
                .entries<IDBQueryPut<StoreName, StoreSchema, StoreName>>(query[method] as any)
                .forEach((([store, query]) => this.#put({
                  ...{storeName: store as StoreName},
                  ...query
                })));
            }
          }

        });
      },
    );
    return this;
  }

  /**
   * 
   * @param query 
   * @param callbackfn 
   * @returns 
   */
  public eachMethod(
    query: IDBQueryInput<StoreSchema, StoreName>,
    callbackfn: (method: keyof IDBQueryInput<StoreSchema, StoreName>) => void
  ): this {
    Object.keys(query).forEach(callbackfn as any);
    return this;
  }

  /**
   * 
   * @param param0 
   * @returns 
   */
  #add<Name extends StoreName>({
    storeName,
    value,
    key,

    // Request.
    onsuccess,
    onerror,

    // Transaction.
    transaction,

    // Subscribe.
    complete,
    error,

    // Store.
    storeNames = this.#store.connection.storeNames,
    mode = "readwrite"
  }: { storeName: Name } & IDBQueryAdd<Name, StoreSchema, StoreName>
  ): this {
    this.#store.add(
      storeName,
      value,
      key,
      onsuccess,
      onerror,
      transaction,
      complete,
      error,
      storeNames,
      mode
    )
    return this;
  }

  /**
   * 
   * @param param0 
   * @returns 
   */
  #get<Name extends StoreName>({
    storeName,
    query,

    // Request.
    onsuccess,
    onerror,

    // Transaction.
    transaction,

    // Store.
    storeNames = this.#store.connection.storeNames,
    mode = "readonly"
  }: { storeName: Name } & IDBQueryGet<StoreName>
  ): this {
    this.#store.get(
      storeName,
      query,
      onsuccess,
      onerror,
      transaction,
      storeNames,
      mode
    );
    return this;
  }

  /**
   * 
   * @param param0 
   * @returns 
   */
  #getAll<Name extends StoreName>({
    storeName,
    query,
    count,

    // Request.
    onsuccess,
    onerror,

    // Transaction.
    transaction,

    // Store.
    storeNames = this.#store.connection.storeNames,
    mode = "readonly"
  }: { storeName: Name } & IDBQueryGetAll<StoreName>
  ): this {
    this.#store.getAll(
      storeName,
      query,
      count,
      onsuccess,
      onerror,
      transaction,
      storeNames,
      mode
    );
    return this;
  }

  /**
   * 
   * @param param0 
   * @returns 
   */
  #openCursor<Name extends StoreName>({
    storeName,
    query,
    direction,

    // Request.
    onsuccess,
    onerror,

    // Transaction.
    transaction,

    // Store.
    storeNames = this.#store.connection.storeNames,
    mode = "readwrite"
  }: { storeName: Name } & IDBQueryOpenCursor<StoreName>
  ): this {
    this.#store.openCursor(
      storeName,
      query,
      direction,
      onsuccess,
      onerror,
      transaction,
      storeNames,
      mode
    );
    return this;
  }

  /**
   * 
   * @param param0 
   * @returns 
   */
  #put<Name extends StoreName>({
    storeName,
    value,
    key,

    // Request.
    onsuccess,
    onerror,

    // Transaction.
    transaction,

    // Store.
    storeNames = this.#store.connection.storeNames,
    mode = "readwrite"
  }: { storeName: Name } & IDBQueryPut<Name, StoreSchema, StoreName>
  ): this {
    this.#store.put(
      storeName,
      value,
      key,
      onsuccess,
      onerror,
      transaction,
      storeNames,
      mode
    );
    return this;
  }
}
