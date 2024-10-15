/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseStoreState } from "@src/models/CommonModels";
import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

interface LeaveStoreType extends BaseStoreState<any> {
  year: number | null;
  month: number;
  setMonth: (month: number) => void;
  setYear: (year: any) => void;
  setIsFilterApplied: (isFilterApplied: boolean) => void;
  reset: () => void;
  isFilterApplied: boolean;
}

export const LeaveStore = create<LeaveStoreType>((set) => ({
  page: 1,
  search: "",
  loading: false,
  data: null,
  isFilterApplied: false,
  year: new Date().getFullYear(),
  month: 0,
  setPage: (page: number) => set({ page }),
  setYear: (year: number) => set({ year }),
  setMonth: (month: number) => set({ month }),
  setIsFilterApplied: (isFilterApplied: boolean) => set({ isFilterApplied }),
  setSearch: (search: string) => set({ search }),
  async fetchData() {
    const { page, search, month, year } = LeaveStore.getState();
    const data = {
      page,
      search,
      month,
      year,
    };
    const result = await apiProvider.fetchLeaveStatusData(data);
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
      year: new Date().getFullYear(),
      month: 0,
    }),
}));
