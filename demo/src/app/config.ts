// config.ts
// import { IndexedDB } from "@angular-package/indexeddb";
import { IndexedDB } from "./indexeddb";

// Config.
export const IDB_CONFIG = IndexedDB.config({
  name: 'databasename',
  storeNames: ['storename1', 'storename2'],
  store: IndexedDB.store({
    'storename1': {
      keyPath: 'id',
      autoIncrement: false,
      index: [
        { name: "name", keyPath: "name", options: { unique: false } },
      ]
    },
    'storename2': {
      keyPath: "id",
      autoIncrement: true,
      index: [
        { name: "name", keyPath: "name", options: { unique: false } },
        { name: "position", keyPath: "position", options: { unique: false } },
        { name: "weight", keyPath: "weight", options: { unique: false } },
        { name: "symbol", keyPath: "symbol", options: { unique: false } }, // change to unique
      ],
    },
  }),
  version: 1
});
