import { IndexedDB } from "./indexeddb/inexeddb.class";

/**
 * 
 */
export const IDB_CONFIG = IndexedDB.config({
  name: 'IDBDatabase',
  storeNames: ['periodic', 'calculations'],
  store: IndexedDB.store({
    calculations: {
      keyPath: 'id',
      autoIncrement: false,
    },
    periodic: {
      keyPath: "id",
      autoIncrement: true,
      index: [
        { name: "name", keyPath: "name", options: { unique: false } },
        { name: "position", keyPath: "position", options: { unique: false } },
        { name: "weight", keyPath: "weight", options: { unique: false } },
        { name: "symbol", keyPath: "symbol", options: { unique: true } },
      ],
    },
  }),
  version: 1
});
