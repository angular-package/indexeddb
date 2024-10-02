// Type.
import { IDBStoreParameters } from "./type/idb-store-parameters.type";

/**
 * IDB configuration used in Angular IDBModule.
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
