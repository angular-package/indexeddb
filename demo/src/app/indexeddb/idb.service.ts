import { Injectable } from "@angular/core";

// Class.
import { IndexedDB } from "./inexeddb.class";

// Config.
import { IDBConfig } from "./idb.config";

// Type.
import { IDBStoreParameters } from "./type/idb-store-parameters.type";

/**
 * 
 */
@Injectable({
  providedIn: "root",
})
export class IDBService<
  StoreSchema extends object,
  Name extends string = string,
  StoreNames extends keyof StoreSchema = keyof StoreSchema,
  Version extends number = number
> {
  /**
   * Returns instance of IndexedDB.
   * @returns 
   */
  public get indexeddb(): IndexedDB<StoreSchema, Name, StoreNames, Version> {
    return this.#indexeddb;
  }

  /**
   * 
   */
  public get store(): IDBStoreParameters<StoreNames> {
    return this.#store;
  }

  /**
   * Returns IndexedDB instance version.
   * @returns 
   */
  public get version(): Version {
    return this.#version;
  }

  /**
   * 
   */
  #indexeddb!: IndexedDB<StoreSchema, Name, StoreNames, Version>;

  /**
   * 
   */
  #name!: Name;

  /**
   * 
   */
  #store!: IDBStoreParameters<StoreNames>;

  /**
   * 
   */
  #storeNames!: StoreNames | StoreNames[];

  /**
   * 
   */
  #version!: Version;

  /**
   * 
   * @param name 
   * @param storeNames 
   * @param store 
   * @param version 
   */
  constructor(private idbconfig: IDBConfig<Name, StoreNames, Version>) {
    if (typeof idbconfig === 'object') {
      if (idbconfig.name) {
        this.#name = idbconfig.name
      };
      if (idbconfig.store) { 
        this.#store = idbconfig.store
      };
      if(idbconfig.storeNames) {
        this.#storeNames = idbconfig.storeNames
      }
      if(idbconfig.version) {
        this.#version = idbconfig.version;
      }
    }
  }

  /**
   * Creates IndexedDB database under provided name, store, and version.
   */
  public create(): IndexedDB<StoreSchema, Name, StoreNames, Version> {
    return this.#indexeddb = new IndexedDB(
      this.#name,
      this.#storeNames,
      this.#store,
      this.#version
    );
  }
}
