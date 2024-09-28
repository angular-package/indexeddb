// Type.
import { IDBQueryAdd } from './idb-query-add.type';
import { IDBQueryGetAll } from './idb-query-get-all.type';
import { IDBQueryGet } from './idb-query-get.type';
import { IDBQueryPut } from './idb-query-put.type';

/**
 * All query method params.
 */
export type IDBQueryMethodProperties<
  StoreSchema extends object,
  StoreName extends keyof StoreSchema
> = IDBQueryAdd<any, StoreSchema, StoreName>
  & IDBQueryGet<StoreName>
  & IDBQueryGetAll<StoreName>
  & IDBQueryPut<any, StoreSchema, StoreName>;
