/**
 * 
 */
export type IDBQueryOpenCursor<
  StoreName extends string | number | symbol = string
> = {
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
  storeNames: StoreName | StoreName[],
  mode: IDBTransactionMode
}
