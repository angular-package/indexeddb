import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// Service.
import { IDBService } from './idb.service';

// Config.
import { IDBConfig } from './idb.config';

/**
 * Angular Module with indexeddb service.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IDBModule {
  /**
   * 
   * @param config 
   * @returns 
   * @memberof IDBModule
   */
  static forRoot(@Optional() @Inject(IDBConfig) config?: IDBConfig): ModuleWithProviders<IDBModule> {
    return {
      ngModule: IDBModule,
      providers: [
        IDBService,
        {provide: IDBConfig, useValue: config, multi: false}
      ]
    }
  }

  /**
   * @static
   * @returns
   * @memberof IDBModule
   */
  static forChild(@Optional() @Inject(IDBConfig) config: IDBConfig): ModuleWithProviders<IDBModule> {
    return {
      ngModule: IDBModule,
      providers: [
        IDBService,
        {provide: IDBConfig, useValue: config, multi: false}
      ]
    };
  }
}
