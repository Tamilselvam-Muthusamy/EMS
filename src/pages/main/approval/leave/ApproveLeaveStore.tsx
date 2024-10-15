/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseStoreState } from "@src/models/CommonModels";
import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

interface ApproveLeaveStoreType extends BaseStoreState<any> {
  month: number;
  year: number | null;
  isFilterApplied: boolean;
  setMonth: (month: number) => void;
  setYear: (year: number | null) => void;
  setIsFilterApplied: (isFilterApplied: boolean) => void;
  reset: () => void;
  fetchManagerApprovedLeaveData: () => void;
}

export const ApproveLeaveStore = create<ApproveLeaveStoreType>((set) => ({
  page: 1,
  search: "",
  month: 0,
  year: new Date().getFullYear(),
  isFilterApplied: false,
  loading: false,
  data: null,
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  setMonth: (month: number) => set({ month }),
  setYear: (year: number | null) => set({ year }),
  setIsFilterApplied: (isFilterApplied: boolean) => set({ isFilterApplied }),
  async fetchData() {
    const { page, search, month, year } = ApproveLeaveStore.getState();
    const result = await apiProvider.fetchApprovalData({
      page,
      search,
      month,
      year,
    });
    set({ loading: true });
    if (result != null) {
      set({ data: result?.data });
    }
    set({ loading: false });
  },
  async fetchManagerApprovedLeaveData() {
    const { page, search, month, year } = ApproveLeaveStore.getState();
    const result = await apiProvider.fetchManagerApprovalData({
      page,
      search,
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
