import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Component
import { AppComponent } from './app.component';

// Module.
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from './table/table.module';


// import { IDBModule } from './indexeddb/idb.module';
import { IDBModule } from '@angular-package/indexeddb';

// Config.
import { IDB_CONFIG } from './indexeddb.config';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    IDBModule.forRoot(IDB_CONFIG)
  ],
  exports: [
    TableModule,
  ],
  providers: [
    // By token.
    // {provide: INDEXEDDB_NAME_TOKEN, useValue: INDEXEDDB_NAME},
    // {provide: INDEXEDDB_STORE_TOKEN, useValue: INDEXEDDB_STORE},
    // {provide: INDEXEDDB_STORE_NAME_TOKEN, useValue: INDEXEDDB_STORE_NAME},
    // {provide: INDEXEDDB_VERSION_TOKEN, useValue: INDEXEDDB_VERSION},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
