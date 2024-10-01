import { Component, OnInit } from '@angular/core';

// Service.
import { IDBService } from '../indexeddb/idb.service';

// Type.
import { StoreSchema } from '../type/store-schema.type';

/**
 * 
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  preserveWhitespaces: true
})
export class TableComponent implements OnInit {

  list: StoreSchema['periodic'][] = [];

  constructor(public indexedDBService: IDBService<StoreSchema>) { }
  
  ngOnInit(): void {
    this.indexedDBService.indexeddb.store.getAll(
      'periodic',
      undefined,
      undefined,
      (result) => this.list = result
    );
  }
}
