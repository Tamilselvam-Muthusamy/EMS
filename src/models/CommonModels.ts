export interface Common<T> {
  from: number;
  to: number;
  totalCount: number;
  totalPages: number;
  data: T[] | null;
}

export interface BaseStoreState<T> {
  page: number;
  search: string;
  loading: boolean;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  data: Common<T> | null;
  fetchData: (id?: any) => void;
}
