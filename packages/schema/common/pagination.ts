export interface IPaginatedData<T> {
  rows: T[];
  total: number;
  page: number;
  limit: number;
}
