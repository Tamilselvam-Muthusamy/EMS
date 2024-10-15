import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

export const DashBoardStore = create<any>((set: any) => ({
  page: 1,
  search: "",
  loading: false,
  month: 0,
  isFilterApplied: false,
  year: new Date().getFullYear(),
  data: null,
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  setMonth: (month: number) => set({ month }),
  setYear: (year: number | null) => set({ year }),
  setIsFilterApplied: (isFilterApplied: boolean) => set({ isFilterApplied }),
  async fetchData() {
    const { month, year } = DashBoardStore.getState();
    const result = await apiProvider.fetchDashboardData({
      month,
      year,
    });
    set({ loading: true });
    if (result != null) {
      set({ data: result?.data });
    }
    set({ loading: false });
  },
  reset: () =>
    set({
      page: 1,
      search: "",
      month: 0,
      year: new Date().getFullYear(),
    }),
}));
