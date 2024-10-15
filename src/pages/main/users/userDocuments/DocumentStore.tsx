import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

export const DocumentStore = create<any>((set: any) => ({
  page: 1,
  search: "",
  loading: false,
  data: null,
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  async fetchData(id: any) {
    const data = {
      userID: Number(id),
    };
    const result = await apiProvider.fetchFiles(data);
    set({ loading: true });
    if (result != null) {
      set({ data: result?.data });
    }
    set({ loading: false });
  },
}));
