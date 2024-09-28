// Type.
import { IDBQueryAdd } from "./idb-query-add.type";
import { IDBQueryGetAll } from "./idb-query-get-all.type";
import { IDBQueryGet } from "./idb-query-get.type";
import { IDBQueryPut } from "./idb-query-put.type";

/**
 * Query method input.
 */
export type IDBQueryMethods<
  Key extends keyof StoreSchema,
  StoreSchema extends object,
  StoreName extends keyof StoreSchema
> = {
  add: IDBQueryAdd<Key, StoreSchema, StoreName>,
  get: IDBQueryGet<StoreName>,
  getAll: IDBQueryGetAll<StoreName>,
  put: IDBQueryPut<Key, StoreSchema, StoreName>,
}
