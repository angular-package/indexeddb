import { Inject, Injectable } from "@angular/core";
import { rxState } from "@rx-angular/state";

// Class.
import { IndexedDB } from "./indexeddb.class";

// Token.
import { INDEXEDDB_NAME_TOKEN } from "./indexeddb-name.token";
import { INDEXEDDB_STORE_NAME_TOKEN, INDEXEDDB_STORE_TOKEN } from "./indexeddb-store.token";
import { INDEXEDDB_VERSION_TOKEN } from "./indexeddb-version.token";

// Type.
import { IDBStore } from "./type/indexeddb-store.type";

@Injectable({
  providedIn: "root",
})
export class IndexedDBService<
  DBName extends string = string,
  StoreNames extends string = string,
  Version extends number = number
> {  
  // public state = rxState<{ [key: string]: Immutable.List<any>[] }>();

  /**
   * Returns instance of IndexedDB.
   * @returns 
   */
  public get indexeddb(): IndexedDB {
    return this.#indexeddb;
  }

  /**
   * 
   */
  public get store(): IDBStore<StoreNames> {
    return this.#store;
  }

  /**
   * Returns IndexedDB instance version.
   * @returns 
   */
  public get version(): Version {
    return this.#version;
  }

  #indexeddb!: IndexedDB<DBName, StoreNames>;
  #name: DBName;
  #store: IDBStore<StoreNames>;
  #storeNames: StoreNames;
  #version: Version;

  /**
   * 
   * @param name 
   * @param store 
   * @param storeName 
   * @param version 
   */
  constructor(
    @Inject(INDEXEDDB_NAME_TOKEN) name: DBName,
    @Inject(INDEXEDDB_STORE_TOKEN) store: IDBStore<StoreNames>,
    @Inject(INDEXEDDB_STORE_NAME_TOKEN) storeName: StoreNames,
    @Inject(INDEXEDDB_VERSION_TOKEN) version: Version
  ) {
    this.#name = name;
    this.#store = store;
    this.#storeNames = storeName;
    this.#version = version;
  }

  /**
   * Creates IndexedDB database under provided name, store, and version.
   */
  public create(): IndexedDB {
    return this.#indexeddb = new IndexedDB(this.#name, this.#store, this.#storeNames, this.#version);
  }
}
