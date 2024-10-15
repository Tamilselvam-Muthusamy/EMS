import { BaseStoreState } from "@src/models/CommonModels";
import apiProvider from "@src/network/apiProvider";
import { create } from "zustand";

interface EmployeeMappingStoretype extends BaseStoreState<any> {
  fetchEmployees: (id: any) => void;
  employeeData: null | any;
}

export const EmployeeMappingStore = create<EmployeeMappingStoretype>(
  (set, get) => ({
    page: 1,
    search: "",
    loading: false,
    setPage: (page: number) => set({ page }),
    setSearch: (search: string) => set({ search }),
    data: null,
    employeeData: null,
    async fetchData(id) {
      const { page, search } = get();
      const result = await apiProvider.fetchEmployeeMappingData(
        { page, search },
        id
      );
      if (result != null) {
        set({ data: result?.data });
      }
    },
    async fetchEmployees(id) {
      const data = {
        departmentId: Number(id),
      };
      const result = await apiProvider.fetchEmployeeData(data);
      if (result != null) {
        set({ employeeData: result?.data });
      }
    },
  })
);
