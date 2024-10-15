/* eslint-disable @typescript-eslint/no-explicit-any */
import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

export const ApproveNoticeStore = create<any>((set: any, get: any) => ({
  page: 1,
  search: "",
  loading: false,
  data: null,
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  async fetchData() {
    const { page, search } = get();
    const data = {
      page,
      search,
    };
    const result = await apiProvider.fetchApproveNoticeData(data);
    set({ loading: true });
    if (result != null) {
      set({ data: result?.data });
    }
    set({ loading: false });
  },
}));
