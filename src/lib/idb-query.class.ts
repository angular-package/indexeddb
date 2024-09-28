import { of } from 'rxjs';

// Class.
import { IDBStore } from './idb-store.class';

// Type.
import { IDBQueryAdd } from './type/query/idb-query-add.type';
import { IDBQueryGet } from './type/query/idb-query-get.type';
import { IDBQueryGetAll } from './type/query/idb-query-get-all.type';
import { IDBQueryInput } from './type/query/idb-query-input.type';
import { IDBQueryMethodProperties } from './type/query/idb-query-method-properties.type';
import { IDBQueryPut } from './type/query/idb-query-put.type';

// Interface.
import { IDBConfig } from './interface/idb-config.interface';
import { IDBQueryOpenCursor } from './type/query/idb-query-open-cursor.type';

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

    // const a = Object.keys(query) as unknown as keyof IndexedDBQueryInput<StoreSchema, StoreName>[];

    of(query).subscribe(
      query => {
        this.eachMethod(query, method => {
          // console.log(query[method]);

          this.eachStore(query[method] as any, (storeName) => {
            const queryMethod = query[method];
            if (queryMethod) {
              const queryStore = queryMethod[storeName as keyof typeof queryMethod] as IDBQueryMethodProperties<StoreSchema, StoreName>;



              console.log(method, storeName, queryStore);
            }
          });
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
   * @param query 
   * @param callbackfn 
   * @returns 
   */
  public eachStore(
    queryStore: IDBQueryInput<StoreSchema, StoreName>,
    callbackfn: (storeName: keyof StoreSchema) => void
  ): this {
    Object.keys(queryStore).forEach(callbackfn as any);
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
