export interface Pagination<T> {
  data: T[],
  pagination: {
    page: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
  },
}
