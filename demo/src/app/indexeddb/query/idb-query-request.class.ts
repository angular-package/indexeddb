// RxJS.
import { of } from 'rxjs';

// Class.
import { IDBStore } from '../idb-store.class';

// Type.
import { IDBQueryAdd } from '../type/query/idb-query-add.type';
import { IDBQueryGet } from '../type/query/idb-query-get.type';
import { IDBQueryGetAll } from '../type/query/idb-query-get-all.type';
import { IDBQueryMethod_Store } from '../type/query/idb-query-method-store.type';
import { IDBQueryOpenCursor } from '../type/query/idb-query-open-cursor.type';
import { IDBQueryPut } from '../type/query/idb-query-put.type';

// Interface.
import { IDBQueryClear } from '../type/query/idb-query-clear.type';
import { IDBQueryCount } from '../type/query/idb-query-count.type';
import { IDBQueryDelete } from '../type/query/idb-query-delete.type';
import { IDBQueryIndex } from '../type/query/idb-query-index.type';

/**
 * 
 */
export class IDBQueryRequest<
  StoreSchema extends object,
  StoreName extends StoreNames,
  StoreNames extends keyof StoreSchema = keyof StoreSchema,
> {

  // constructor(name: StoreName) {}


  public add(query: IDBQueryAdd<StoreName, StoreSchema, StoreNames>): this {
    of(query).subscribe(
      query => {
        // this.eachMethod(query, method => {
        // });
      }
    );
    return this;
  }

  public clear(query: IDBQueryClear<StoreName>): this {
    return this;
  }

  public count(query: IDBQueryCount<StoreName>): this {
    return this;
  }

  public delete(query: IDBQueryDelete<StoreName>): this {
    return this;
  }

  public get(query: IDBQueryAdd<StoreName, StoreSchema, StoreNames>): this {
    return this;
  }

  public getAll(query: IDBQueryGetAll<StoreName, StoreSchema, StoreNames>): this {
    return this;
  }

  public index(query: IDBQueryIndex<StoreName>): this {
    return this;
  }

  public openCursor(query: IDBQueryOpenCursor<StoreSchema, StoreNames>): this {
    return this;
  }

  public put(query: IDBQueryPut<StoreName, StoreSchema, StoreNames>): this {
    return this;
  }

  /**
   * 
   */
  // public execute(
  //   query: IDBQueryInput<StoreSchema, StoreNames>,
  // ): this {
  //   of(query).subscribe(
  //     query => {
  //       this.eachMethod(query, method => {
  //         if (method === 'add') {
  //           if (query[method]) {
  //             // Object
  //             //   .entries<IDBQueryAdd<StoreNames, StoreSchema, StoreNames>>(query[method] as any)
  //             //   .forEach((([store, query]) => this.#add({
  //             //     ...{storeName: store as StoreNames},
  //             //     ...query
  //             //   })));
  //           }
  //         }

  //         if (method === 'get') {
  //           if (query[method]) {
  //             // TODO: StoreName
  //             // Object
  //             //   .entries<IDBQueryGet<StoreNames, StoreSchema, StoreNames>>(query[method] as any)
  //             //   .forEach((([store, query]) => this.#get({
  //             //     ...{storeName: store as StoreNames},
  //             //     ...query
  //             //   })));
  //           }
  //         }

  //         if (method === 'getAll') {
  //           if (query[method]) {
  //             // Object
  //             //   .entries<IDBQueryGetAll<StoreNames, StoreSchema, StoreNames>>(query[method] as any)
  //             //   .forEach((([store, query]) => this.#getAll({
  //             //     ...{storeName: store as StoreNames},
  //             //     ...query
  //             //   })));
  //           }
  //         }

  //         if (method === 'openCursor') {
  //           if (query[method]) {
  //             // Object
  //             //   .entries<IDBQueryOpenCursor<StoreNames>>(query[method] as any)
  //             //   .forEach((([store, query]) => this.#openCursor({
  //             //     ...{storeName: store as StoreNames},
  //             //     ...query
  //             //   })));
  //           }
  //         }

  //         if (method === 'put') {
  //           if (query[method]) {
  //             // Object
  //             //   .entries<IDBQueryPut<StoreNames, StoreSchema, StoreNames>>(query[method] as any)
  //             //   .forEach((([store, query]) => this.#put({
  //             //     ...{storeName: store as StoreNames},
  //             //     ...query
  //             //   })));
  //           }
  //         }

  //       });
  //     },
  //   );
  //   return this;
  // }

  /**
   * 
   * @param query 
   * @param callbackfn 
   * @returns 
   */
  // public eachMethod(
  //   query: IDBQueryInput<StoreSchema, StoreNames>,
  //   callbackfn: (method: keyof IDBQueryInput<StoreSchema, StoreNames>) => void
  // ): this {
  //   Object.keys(query).forEach(callbackfn as any);
  //   return this;
  // }

  // /**
  //  * 
  //  * @param param0 
  //  * @returns 
  //  */
  // #add<Name extends StoreName>({
  //   storeName,
  //   value,
  //   key,

  //   // Request.
  //   onsuccess,
  //   onerror,

  //   // Transaction.
  //   transaction,

  //   // Subscribe.
  //   complete,
  //   error,

  //   // Store.
  //   storeNames = this.#store.connection.storeNames,
  //   mode = "readwrite"
  // }: { storeName: Name } & IDBQueryAdd<Name, StoreSchema, StoreName>
  // ): this {
  //   this.#store.add(
  //     storeName,
  //     value,
  //     key,
  //     onsuccess,
  //     onerror,
  //     transaction,
  //     complete,
  //     error,
  //     storeNames,
  //     mode
  //   )
  //   return this;
  // }

  // /**
  //  * 
  //  * @param param0 
  //  * @returns 
  //  */
  // #get<Name extends StoreName>({
  //   storeName,
  //   query,

  //   // Request.
  //   onsuccess,
  //   onerror,

  //   // Transaction.
  //   transaction,

  //   // Store.
  //   storeNames = this.#store.connection.storeNames,
  //   mode = "readonly"
  // }: { storeName: Name } & IDBQueryGet<Name, StoreSchema, StoreName>
  // ): this {
  //   this.#store.get(
  //     storeName,
  //     query,
  //     onsuccess,
  //     onerror,
  //     transaction,
  //     storeNames,
  //     mode
  //   );
  //   return this;
  // }

  // /**
  //  * 
  //  * @param param0 
  //  * @returns 
  //  */
  // #getAll<Name extends StoreName>({
  //   storeName,
  //   query,
  //   count,

  //   // Request.
  //   onsuccess,
  //   onerror,

  //   // Transaction.
  //   transaction,

  //   // Store.
  //   storeNames = this.#store.connection.storeNames,
  //   mode = "readonly"
  // }: { storeName: Name } & IDBQueryGetAll<Name, StoreSchema, StoreName>
  // ): this {
  //   this.#store.getAll(
  //     storeName,
  //     query,
  //     count,
  //     onsuccess,
  //     onerror,
  //     transaction,
  //     storeNames,
  //     mode
  //   );
  //   return this;
  // }

  // /**
  //  * 
  //  * @param param0 
  //  * @returns 
  //  */
  // #openCursor<Name extends StoreName>({
  //   storeName,
  //   query,
  //   direction,

  //   // Request.
  //   onsuccess,
  //   onerror,

  //   // Transaction.
  //   transaction,

  //   // Store.
  //   storeNames = this.#store.connection.storeNames,
  //   mode = "readwrite"
  // }: { storeName: Name } & IDBQueryOpenCursor<StoreName>
  // ): this {
  //   this.#store.openCursor(
  //     storeName,
  //     query,
  //     direction,
  //     onsuccess,
  //     onerror,
  //     transaction,
  //     storeNames,
  //     mode
  //   );
  //   return this;
  // }

  // /**
  //  * 
  //  * @param param0 
  //  * @returns 
  //  */
  // #put<Name extends StoreName>({
  //   storeName,
  //   value,
  //   key,

  //   // Request.
  //   onsuccess,
  //   onerror,

  //   // Transaction.
  //   transaction,

  //   // Store.
  //   storeNames = this.#store.connection.storeNames,
  //   mode = "readwrite"
  // }: { storeName: Name } & IDBQueryPut<Name, StoreSchema, StoreName>
  // ): this {
  //   this.#store.put(
  //     storeName,
  //     value,
  //     key,
  //     onsuccess,
  //     onerror,
  //     transaction,
  //     storeNames,
  //     mode
  //   );
  //   return this;
  // }
}
