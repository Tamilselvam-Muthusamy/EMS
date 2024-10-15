/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseStoreState } from "@src/models/CommonModels";
import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

interface UserStoreType extends BaseStoreState<any> {
  fetchRoleData: () => void;
  roleData: any;
  fetchLastUserCode: () => void;
  lastUserData: any;
  roleID: number;
  departmentID: number;
  setRoleId: (roleId: number) => void;
  setDepartmentId: (departmentId: number) => void;
  setIsFilterApplied: (isFilterApplied: boolean) => void;

  reset: () => void;
  isFilterApplied: boolean;
}

export const UserStore = create<UserStoreType>((set) => ({
  page: 1,
  search: "",
  roleID: 0,
  departmentID: 0,
  loading: false,
  isFilterApplied: false,
  roleData: null,
  lastUserData: null,
  data: null,
  setIsFilterApplied: (isFilterApplied: boolean) => set({ isFilterApplied }),
  setRoleId: (roleID: number) => set({ roleID }),
  setDepartmentId: (departmentID: number) => set({ departmentID }),
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  async fetchData() {
    const { page, search, departmentID, roleID } = UserStore.getState();
    const result = await apiProvider.fetchUserData({
      page,
      search,
      departmentID,
      roleID,
    });
    set({ loading: true });
    if (result != null) {
      set({ data: result?.data });
    }
    set({ loading: false });
  },
  async fetchRoleData() {
    const result = await apiProvider.fetchRole();
    if (result != null) {
      set({ roleData: result?.data });
    }
  },
  async fetchLastUserCode() {
    const result = await apiProvider.fetchLastUserCode();
    if (result !== null) {
      set({ lastUserData: result?.data });
    }
  },
  reset: () =>
    set({
      page: 1,
      search: "",
      roleID: 0,
      departmentID: 0,
      data: null,
      isFilterApplied: false,
    }),
}));
