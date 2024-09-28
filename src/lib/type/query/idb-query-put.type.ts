/**
 * Query Put Parameters.
 */
export type IDBQueryPut<
  Name extends keyof StoreSchema,
  StoreSchema extends object,
  StoreName extends keyof StoreSchema = keyof StoreSchema
> = {
  value: StoreSchema[Name],
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
  storeNames?: StoreName | StoreName[],
  mode?: IDBTransactionMode

}
