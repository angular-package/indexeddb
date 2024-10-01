import { Component, ViewEncapsulation } from '@angular/core';

// Service.
import { IDBService } from './indexeddb/idb.service';

// Constant.
import { ELEMENT_DATA } from './element-data.const';

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
        indexeddb.query.get({
          'storeName': 'periodic',
          'query': 57
        }),

        indexeddb.query.store({
          periodic: {
            add: {
              value: {'name': 'a', 'position': 2, 'symbol': 'd', 'weight': 0.1}
            }
          },
        }),

        indexeddb.query.method({'add': {'periodic': {'value': {'name': 'a', 'position': 2, 'symbol': 'd', 'weight': 0.1}}}}),

        indexeddb.query.add({ storeName: 'periodic', value: ELEMENT_DATA }),

        // indexeddb.query.clear({ storeName: 'periodic', onsuccess: result => console.log(`Clear: `, result) }),

        // indexeddb.query.count({ storeName: 'periodic', 'range': { lower: 65 }, onsuccess: result => console.log(`Count: `, result) }),

        // indexeddb.query.delete({ storeName: 'periodic', query: 69, onsuccess: result => console.log(`Delete`, result) }),

        // indexeddb.query.get({ storeName: 'periodic', query: 166, onsuccess: result => console.log(`Get: `, result) }),

        // indexeddb.query.getAll({ storeName: 'periodic', onsuccess: result => console.log(`GetAll: `, result) }),

        // indexeddb.query.index({ storeName: 'periodic', name: 'position', onsuccess: index => { console.log(index); }}),

        // openCursor
        // indexeddb.query.openCursor({ storeName: 'periodic', onsuccess: (result, request) => {
        //   if (result.value) {
        //     console.log(result.value);
        //     result.continue();
        //   }
        // }}),

        // put
        // indexeddb.query.put({ storeName: 'periodic', value: {name: 'test', position: 82, symbol: 'OH', weight: 0.231 }, onsuccess: result => console.log(`Put: `, result) }),


        // indexeddb.query.store({
        //   periodic: {
        //     add: {
        //       value: { name: 'Lux tools', position: 4, symbol: 'AGH', weight: 0.4123 }
        //     }
        //   }
        // }),


        indexeddb.query.store({
          periodic: {
            get: {'query': 415}
            // add: { value: {'id': 1, 'name': 'a', 'position': 3, 'symbol': 'asd', 'weight': 333 }},
            // clear: { onsuccess: (result) => console.log(result) }
          }
        }),


        // indexeddb.query.method({
        //   add: {
        //     periodic: {
        //       onsuccess: (result, request, ev) => {
        //         console.log(result);
        //       },
        //       onerror: ev => {
        //         console.log(ev);
        //       },
        //       value: [
        //         { name: 'a1', position: 2, symbol: '223', weight: 1 },
        //         { name: 'b2', position: 2, symbol: '33', weight: 1 },
        //       ],
        //     },
        //     // calculations: {
        //     //   value: {id: 1}
        //     // }
        //   }

        //   // get: {
        //   //   periodic: {
        //   //     query: ''
        //   //   },
        //   //   calculations: {
        //   //     query: ''
        //   //   }
        //   // },

        // }),

        indexeddb.query.count({ storeName: 'periodic', onsuccess: result => console.log(result) }),
        indexeddb.query.getAll({ storeName: 'periodic', onsuccess: result => console.log(result) })

        // , store.add(
        //   'periodic',
        //   ELEMENT_DATA,
        //   undefined,
        //   (result) => console.log(result),
        //   (ev: any) => console.log(`error`),
        //   undefined,
        // )
    ));
  }
}
