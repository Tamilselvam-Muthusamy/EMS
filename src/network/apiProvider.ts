import { showNotification } from "@mantine/notifications";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import apiClient from "./apiClient";

export class ApiProvider {
  constructor(private readonly server: typeof apiClient) {}

  showAlertNotification(message: string, success: boolean) {
    showNotification({
      color: success ? "#0284c7" : "#9A031E",
      title: success ? "Success" : "Error",
      message,
    });
  }

  showAxiosErrorAlert(error: unknown | Error) {
    let message = "Something went wrong";
    if (error instanceof AxiosError && error.response) {
      message = error.response.data?.message ?? message;
    } else {
      message = String(error);
    }
    this.showAlertNotification(message, false);
  }

  isRequestSuccess(reqStatus: number): boolean {
    return (
      reqStatus === HttpStatusCode.Created || reqStatus === HttpStatusCode.Ok
    );
  }

  extractMessage(response: AxiosResponse) {
    const message: string = response.data?.message ?? "";
    return message;
  }

  extractData(response: AxiosResponse) {
    const data = response?.data?.data ?? [];
    return data;
  }

  async login(logiData: any) {
    try {
      const response = await this.server.post("auth/login", logiData);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async logOut() {
    try {
      const response = await this.server.post("auth/logout");
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async sendOtp(sendOtpInput: any) {
    try {
      const response = await this.server.post(
        "forgotPassword/sendOtp",
        sendOtpInput
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async validateOtp(sendOtpInput: any) {
    try {
      const response = await this.server.post(
        "forgotPassword/verifyOtp",
        sendOtpInput
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async resetPassword(verifyOtpInput: any) {
    try {
      const response = await this.server.post(
        "user/resetPassword",
        verifyOtpInput
      );

      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async createUser(createUserData: any) {
    try {
      const response = await this.server.post("hr/user", createUserData);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async updateUser(updateUserData: any, userId: any) {
    try {
      const response = await this.server.patch(
        `hr/user/${userId}`,
        updateUserData
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async removeUser(userId: number) {
    try {
      const response = await this.server.delete(`hr/user/${userId}`);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchUserData(getUserData: any) {
    try {
      const response = await this.server.get("hr/user", {
        params: getUserData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchLastUserCode() {
    try {
      const response = await this.server.get("hr/user/lastUserCode");
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchRole() {
    try {
      const response = await this.server.get("/role");
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchDepartmentData(departmentData: any) {
    try {
      const response = await this.server.get("department", {
        params: departmentData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchLeadUserData(leadUserData: any) {
    try {
      const response = await this.server.get("hr/user/unmappedLeads", {
        params: leadUserData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchUpdateLeadUserData(leadUserData: any) {
    try {
      const response = await this.server.post(
        `hr/user/unmappedLeadsIncludeID`,
        leadUserData
      );
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async createDepartment(departmentData: any) {
    try {
      const response = await this.server.post("department", departmentData);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async updateDepartment(departmentData: any, departmentId: number) {
    try {
      const response = await this.server.patch(
        `department/${departmentId}`,
        departmentData
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async removeDepartment(departmentId: number) {
    try {
      const response = await this.server.delete(`department/${departmentId}`);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchEmployeeData(data: any) {
    try {
      const response = await this.server.post(
        "hr/user/fetchUnmappedUsers",
        data
      );
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async mappingEmployee(employeeData: any, departmentId: number) {
    try {
      const response = await this.server.post(
        `department/${departmentId}/mapUsers`,
        employeeData
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchEmployeeMappingData(data: any, departmenetid: number) {
    try {
      const response = await this.server.get(
        `department/${departmenetid}/users`,
        { params: data }
      );
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async unMapEmployee(employeeData: any) {
    try {
      const response = await this.server.post(
        "department/unmapUser",
        employeeData
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async applyLeave(leaveData: any) {
    try {
      const response = await this.server.post("leave", leaveData);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchLeaveStatusData(leaveStatusData: any) {
    try {
      const response = await this.server.get("leave", {
        params: leaveStatusData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchApprovalData(approvalData: any) {
    try {
      const response = await this.server.get("lead/leave", {
        params: approvalData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchManagerApprovalData(approvalData: any) {
    try {
      const response = await this.server.get("manager/leave", {
        params: approvalData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async updateLeave(approvalData: any, approavlId: any) {
    try {
      const response = await this.server.patch(
        `lead/leave/${approavlId}`,
        approvalData
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async removeLeave(leaveId: number) {
    try {
      const response = await this.server.delete(`leave/${leaveId}`);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async applyPermission(permissionData: any) {
    try {
      const response = await this.server.post("permission", permissionData);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchPermissionApprovalData(permissionApprovalData: any) {
    try {
      const response = await this.server.get("lead/permission", {
        params: permissionApprovalData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchMangerPermissionApprovalData(permissionApprovalData: any) {
    try {
      const response = await this.server.get("manager/permission", {
        params: permissionApprovalData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async updatePermission(approvalData: any, permissionId: any) {
    try {
      const response = await this.server.patch(
        `lead/permission/${permissionId}`,
        approvalData
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async removePermission(permissionId: number) {
    try {
      const response = await this.server.delete(`permission/${permissionId}`);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchPermissionStatusData(leaveStatusData: any) {
    try {
      const response = await this.server.get("permission", {
        params: leaveStatusData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async changePassword(passwordData: any) {
    try {
      const response = await this.server.post(
        "user/changePassword",
        passwordData
      );

      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async uploadFiles(fileData: any) {
    try {
      const response = await this.server.post("hr/user/uploadFiles", fileData);

      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchFiles(fileData: any) {
    try {
      const response = await this.server.get("hr/user/files", {
        params: fileData,
      });

      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async downloadFiles(fileData: any) {
    try {
      const response = await this.server.get("hr/user/file", {
        params: fileData,
        responseType: "blob",
      });

      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data;
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchExistingUserDetails(userData: any) {
    try {
      const response = await this.server.get("user/details", {
        params: userData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async createUserProfileDetails(createUserData: any) {
    try {
      const response = await this.server.post(
        "hr/user/details",
        createUserData
      );
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchNoticeBoardData(noticeBoardData: any) {
    try {
      const response = await this.server.get("notice", {
        params: noticeBoardData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async applyNotice(noticeData: any) {
    try {
      const response = await this.server.post("notice", noticeData);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchDashboardData(dashboardData: any) {
    try {
      const response = await this.server.get("dashboard", {
        params: dashboardData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async approveNotice(noticeData: any) {
    try {
      const response = await this.server.post("hr/notice", noticeData);
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchApproveNoticeData(noticeBoardData: any) {
    try {
      const response = await this.server.get("hr/notice", {
        params: noticeBoardData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async removeDocument(documentData: any) {
    try {
      const response = await this.server.delete("hr/user/file", {
        params: documentData,
      });
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchLeaveStatsData(leaveStatsData: any) {
    try {
      const response = await this.server.get("hr/leave/userLeave", {
        params: leaveStatsData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async fetchPermissionStatsData(permissionStatsData: any) {
    try {
      const response = await this.server.get("hr/permission/userPermission", {
        params: permissionStatsData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
  async unMappedHR() {
    try {
      const response = await this.server.get("hr/user/unmappedHrs");
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
}

const apiProvider = new ApiProvider(apiClient);

export default apiProvider;
