import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

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

  subject = new Subject<StoreSchema['periodic']>();

  constructor(public indexedDBService: IDBService<StoreSchema>) {
    this.subject.subscribe({
      next: result => {
        // this.list.push(result);
        this.indexedDBService.indexeddb.store.getAll(
          'periodic',
          undefined,
          undefined,
          (result) => this.list = result
        )
      }
    })
  }

  ngOnInit(): void {
    this.subject.next(undefined);
  }

  onSubmit(f: NgForm) {
    this.add(f);
    this.subject.next(f.value);
  }

  add(f: NgForm) {
    this.indexedDBService.indexeddb.query.add({
      'storeName': 'periodic',
      'value': {
        'position': f.value.position,
        'name': f.value.name,
        'weight': f.value.weight,
        'symbol': f.value.symbol,
      }
    });
  }

  remove(id?: number) {
    if (id) {
      this
        .indexedDBService
        .indexeddb
        .query
        .delete({ 'storeName': 'periodic', query: id, onsuccess: result => this.subject.next(undefined) });  
    }
  }
}
