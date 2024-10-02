// Interface.
import { PeriodicElement } from "../interface/periodic-element.interface";

/**
 * 
 */
export type StoreSchema = Partial<{
  periodic?: PeriodicElement;
  calculations?: {id: number};
}>;
