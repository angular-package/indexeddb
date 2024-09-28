/**
 * 
 */
export type IDBStoreParameters<StoreName extends string | number | symbol = string> = {
  [Key in StoreName]: IDBObjectStoreParameters & {
    index?: {
      name: string;
      keyPath: string | string[];
      options?: IDBIndexParameters;
    }[];
  }
};
