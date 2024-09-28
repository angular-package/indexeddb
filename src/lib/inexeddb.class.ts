// Class.
import { IDBConnection } from './idb-connection.class';
import { IDBData } from './idb-data.class';
import { IDBQuery } from './idb-query.class';
import { IDBStore } from './idb-store.class';

// Interface.
import { IDBConfig } from './interface/idb-config.interface';

// Type.
import { IDBStoreParameters } from './type/idb-store-parameters.type';
import { IDBQueryInput } from './type/query/idb-query-input.type';

/**
 * 
 */
export class IndexedDB<
  StoreSchema extends object,
  Name extends string = string,
  StoreName extends keyof StoreSchema = keyof StoreSchema,
  Version extends number = number
> {
  /**
   * 
   * @param config 
   * @returns 
   */
  public static config: <
    Name extends string,
    StoreName extends string,
    Version extends number = number
  >(config: IDBConfig<Name, StoreName, Version>) => IDBConfig<Name, StoreName, Version> =
    <
      Name extends string,
      StoreName extends string,
      Version extends number = number
    >(config: IDBConfig<Name, StoreName, Version>) => config;

  /**
   * 
   * @param store 
   * @returns 
   */
  public static store: <StoreName extends string>(store: IDBStoreParameters<StoreName>) => IDBStoreParameters<StoreName> =
    <StoreName extends string>(store: IDBStoreParameters<StoreName>) => store;

  /**
   * 
   */
  public get connection() {
    return this.#query.connection;
  }

  /**
   * 
   */
  public get store(): IDBStore<StoreSchema, Name, StoreName, Version> {
    return this.#query.store;
  }

  /**
   * 
   */
  #query!: IDBQuery<StoreSchema, Name, StoreName, Version>;

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
    this.#query = new IDBQuery(
      undefined,
      { name, storeNames, store, version }
    );
  }

  /**
   * 
   * @param onOpenSuccess 
   * @returns 
   */
  public onOpenSuccess(
    onOpenSuccess: (
      indexeddb: IndexedDB<StoreSchema, Name, StoreName, Version>,
      store: IDBStore<StoreSchema, Name, StoreName, Version>,
      database: IDBData<Name, StoreName, Version>,
      connection: IDBConnection<Name, StoreName, Version>,
      openRequest: IDBOpenDBRequest,
      ev: Event
    ) => any
  ): this {
    this.connection.request.addEventListener(
      'success',
      ev => onOpenSuccess(
        this,
        this.#query.store,
        this.#query.store.database,
        this.connection,
        this.connection.request,
        ev
      ),
      true
    );
    return this;
  }

  /**
   * 
   * @param config 
   * @returns 
   */
  public query(
    query: IDBQueryInput<StoreSchema, StoreName>
  ): IDBQuery<StoreSchema, Name, StoreName, Version> | undefined {
    return this.#query.execute(query);
  }
}
