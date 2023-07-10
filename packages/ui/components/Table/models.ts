export interface PaginatedData<T> {
  rows: T[];
  pageNumber: number;
  totalCount: number;
}
