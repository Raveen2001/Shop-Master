export interface IColumnSort<T> {
  id: keyof T;
  desc: boolean;
}
