import { Injectable } from "@angular/core";
import { rxState } from "@rx-angular/state";
import { from } from "rxjs";

// Service.
import { IndexedDBService } from "./indexeddb.service";

@Injectable({
  providedIn: "root",
})
export class IndexedDBState<
  DBName extends string = string,
  StoreNames extends string = string,
  Version extends number = number
> {  
  public state = rxState<{ [key: string]: Immutable.List<any>[] }>();

  /**
   * 
   * @param indexedDBService 
   */
  constructor(private indexedDBService: IndexedDBService<DBName, StoreNames, Version>) {
    from(Object.keys(indexedDBService.store)).subscribe({
      next: name => {
        this.state.set({[name]: []});
      }
    })
  }

  public set() {}
}
