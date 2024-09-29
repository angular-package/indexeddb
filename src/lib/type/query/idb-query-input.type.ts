// Type.
import { IDBQueryAdd } from "./idb-query-add.type";
import { IDBQueryGet } from "./idb-query-get.type";
import { IDBQueryGetAll } from "./idb-query-get-all.type";
import { IDBQueryOpenCursor } from "./idb-query-open-cursor.type";
import { IDBQueryPut } from "./idb-query-put.type";

/**
 * Variant Method -> StoreName -> QueryMethod
 */
export type IDBQueryInput<
  StoreSchema extends object,
  StoreName extends keyof StoreSchema = keyof StoreSchema,
> = {
  add?: Partial<{ [Key in StoreName]: IDBQueryAdd<Key, StoreSchema, StoreName> }>,
  get?: Partial<{ [Key in StoreName]: IDBQueryGet<StoreName> }>,
  getAll?: Partial<{ [Key in StoreName]: IDBQueryGetAll<StoreName> }>,
  openCursor?: Partial<{ [Key in StoreName]: IDBQueryOpenCursor<StoreName> }>,
  put?: Partial<{ [Key in StoreName]: IDBQueryPut<Key, StoreSchema, StoreName> }>,
}

// Examples.
// const test: IndexedDBQueryInput<{periodic: {id: number, name: string}}> 
// test.get?.periodic
