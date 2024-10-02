// example.ts
// import { IndexedDB } from "@angular-package/indexeddb";
import { IndexedDB } from "./indexeddb";

import { IDB_CONFIG } from './config';

// Initialize.
const indexeddb = new IndexedDB<
  // Create store interface.
  {
    storename1: {
      id: number,
      name: string
    },
    storename2: {
      id: number,
      name: string,
      position: number,
      weight: number,
      symbol: string
    }
  }
>(
  IDB_CONFIG.name,
  IDB_CONFIG.storeNames,
  IDB_CONFIG.store,
  IDB_CONFIG.version
);

// Add by method
indexeddb.query.method({
  'add': {
    'storename2': {
      value: {
        'id': 1,
        'name': 'name',
        'position': 1,
        'symbol': 'N',
        'weight': 100
      },
      'onsuccess': (result) => console.log(result),
      'onerror': (ev) => console.log(`error`, ev),
    }
  }
})

// Get
indexeddb.query.method({
  'get': {
    'storename2': {
      'query': 1,
      'onsuccess': (result => console.log(result)),
      'onerror': () => console.log(`error`)
    },
  }
});

// Add by store
indexeddb.query.store({
  'storename1': {
    'add': {
      'value': {
        'id': 2,
        'name': 'item'
      },
      'onsuccess': (result) => console.log(result) 
    }
  }
})

// Get
indexeddb.query.store({
  'storename1': {
    'get': {
      'query': 2,
      'onsuccess': result => console.log(result)
    }
  }
})
