/**
 * 
 */
export type IDBQueryGet<
  StoreName extends string | number | symbol = string
> = {
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
  storeNames?: StoreName | StoreName[],
  mode?: IDBTransactionMode;
}
