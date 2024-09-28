/**
 * 
 */
export type IDBQueryAdd<
  Name extends keyof StoreSchema,
  StoreSchema extends object,
  StoreName extends keyof StoreSchema = keyof StoreSchema
> = {
  // storeName: StoreName, 
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
  storeNames?: StoreName | StoreName[];
  mode?: IDBTransactionMode;
};
