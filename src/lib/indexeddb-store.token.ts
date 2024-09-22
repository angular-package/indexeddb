import { InjectionToken } from "@angular/core";
// Type.
import { IDBStore } from "./type/indexeddb-store.type";
/**
 *
 */
export const INDEXEDDB_STORE_TOKEN = new InjectionToken<IDBStore>("IDBStore");
export const INDEXEDDB_STORE_NAME_TOKEN = new InjectionToken<IDBStore>("IDBStoreName");
