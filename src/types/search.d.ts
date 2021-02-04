/* 数据接口 */
declare interface StoreConfig<T> {
  type: SearchType;
  page: number;
  list: Array<T>;
}

declare type complex = Song | Songlist | Artist | Album | User;

declare interface IStoreData {
  [key: string]: StoreConfig<complex>;
}
