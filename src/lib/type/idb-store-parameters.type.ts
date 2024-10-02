/**
 * 
 */
export type IDBStoreParameters<StoreNames extends string | number | symbol = string> = {
  [StoreName in StoreNames]: IDBObjectStoreParameters & {
    index?: {
      name: string;
      keyPath: string | string[];
      options?: IDBIndexParameters;
    }[];
  }
};
