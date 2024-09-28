import { Component, ViewEncapsulation } from '@angular/core';

// Service.
import { IDBService } from './indexeddb/idb.service';

// Constant.
import { ELEMENT_DATA } from './element-data.const';
import { IDB_CONFIG } from './indexeddb.config';

// Class.
import { IDBQuery } from './indexeddb/idb-query.class';
import { IndexedDB } from './indexeddb/inexeddb.class';

// Type.
import { StoreSchema } from './type/store-schema.type';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'indexeddb';

  /**
   * 
   * @param indexedDBService 
   */
  constructor(indexedDBService: IDBService<StoreSchema>) {
    indexedDBService
      .create()
      .onOpenSuccess((indexeddb, store) => (

        indexeddb.query({
          add: {
            periodic: {
              value: { id: 1, name: 'a', 'position': 2, 'symbol': 'a', 'weight': 1}
            },
            calculations: {
              value: {id: 1}
            }
          },

          get: {
            periodic: {
              query: ''
            },
            calculations: {
              query: ''
            }
          },

        }),

        store.add(
          'periodic',
          ELEMENT_DATA,
          undefined,
          (result) => console.log(result),
          (ev: any) => console.log(`error`),
          undefined,
        )
    ));
  }
}
