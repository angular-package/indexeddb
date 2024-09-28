// Type.
import { IDBStoreParameters } from "./type/idb-store-parameters.type";

/**
 * 
 */
export class IDBConfig<
  Name extends string = string,
  StoreName extends string | number | symbol = string,
  Version extends number = number
> {
  name?: Name;
  storeNames?: StoreName | StoreName[];
  store?: IDBStoreParameters<StoreName>;
  version?: Version;
};
