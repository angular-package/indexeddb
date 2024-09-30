// Type.
import { IDBQueryMethodCommon } from "./idb-query-method-common.type";

/**
 * 
 */
export type IDBQueryDelete<
  StoreNames extends string | number | symbol = string,
> = {
  query: IDBValidKey | IDBKeyRange
} & IDBQueryMethodCommon<StoreNames, undefined, undefined>;
