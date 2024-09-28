import { InjectionToken } from "@angular/core";

// Type.
import { IDBStoreParameters } from "./type/idb-store-parameters.type";

/**
 *
 */
export const IDB_STORE_TOKEN = new InjectionToken<IDBStoreParameters<any>>("IDBStore");
export const IDB_STORE_NAME_TOKEN = new InjectionToken<IDBStoreParameters<any>>("IDBStoreName");
