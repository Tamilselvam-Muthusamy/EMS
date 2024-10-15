import { BaseStoreState } from "@src/models/CommonModels";
import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

interface DepartmentStoreType extends BaseStoreState<any> {
  fetchLeadUsers: () => void;
  leadUserData: null | any;
  fetchUpdateLeadUsers: (data: any) => void;
  updateLeadUserData: null | any;
  fetchUnMappedHR: () => void;
}

export const DepartmentStore = create<DepartmentStoreType>((set, get) => ({
  page: 1,
  search: "",
  loading: false,
  data: null,
  leadUserData: null,
  updateLeadUserData: null,
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  async fetchData() {
    const { page, search } = get();
    const result = await apiProvider.fetchDepartmentData({ page, search });
    if (result != null) {
      set({ data: result?.data });
    }
  },
  async fetchLeadUsers() {
    const data = {
      page: 0,
      search: "",
    };
    const result = await apiProvider.fetchLeadUserData(data);
    if (result != null) {
      set({ leadUserData: result?.data });
    }
  },
  async fetchUpdateLeadUsers(data) {
    const result = await apiProvider.fetchUpdateLeadUserData(data);
    if (result != null) {
      set({ updateLeadUserData: result?.data });
    }
  },
  async fetchUnMappedHR() {
    const result = await apiProvider.unMappedHR();
    if (result != null) {
      set({ leadUserData: result?.data });
    }
  },
}));
