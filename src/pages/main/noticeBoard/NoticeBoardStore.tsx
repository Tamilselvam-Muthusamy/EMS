import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

export const NoticeBoardStore = create<any>((set: any) => ({
  page: 1,
  search: "",
  loading: false,
  data: null,
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  async fetchData() {
    const { page, search } = NoticeBoardStore.getState();
    const result = await apiProvider.fetchNoticeBoardData({
      page,
      search,
    });
    set({ loading: true });
    if (result != null) {
      set({ data: result.data });
    }
    set({ loading: false });
  },
}));
