import { Component, ViewEncapsulation } from '@angular/core';

// Service.
// import { IDBService } from './indexeddb/idb.service';
import { IDBService } from '@angular-package/indexeddb';

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
      // Uncomment to set initial data.
      // .onOpenSuccess((indexeddb, store) => indexeddb.query.add({ storeName: 'periodic', value: ELEMENT_DATA }));
  }
}
