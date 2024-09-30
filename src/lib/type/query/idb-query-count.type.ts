// Type.
import { IDBQueryMethodCommon } from "./idb-query-method-common.type";

/**
 * 
 */
export type IDBQueryCount<
  StoreNames extends string | number | symbol = string,
> = IDBQueryMethodCommon<StoreNames, number, number>;
