// Type.
import { IDBQueryMethodCommon } from "./idb-query-method-common.type";

/**
 * 
 */
export type IDBQueryIndex<
  StoreNames extends string | number | symbol = string,
> = {
  query: IDBValidKey | IDBKeyRange,
} & IDBQueryMethodCommon<StoreNames, any, any>;
