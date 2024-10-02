// Type.
import { IDBStoreParameters } from "./type/idb-store-parameters.type";

/**
 * 
 */
export class IDBConfig<
  Name extends string = string,
  StoreNames extends string | number | symbol = string,
  Version extends number = number
> {
  name?: Name;
  storeNames?: StoreNames | StoreNames[];
  store?: IDBStoreParameters<StoreNames>;
  version?: Version;
};
