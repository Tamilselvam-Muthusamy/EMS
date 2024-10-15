import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import NotFoundPage from "./pages/NotFound";
import Leave from "./pages/main/requests/leave/Leave";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import ForgotPassowrd from "./pages/login/ForgotPassword";
import { ModalsProvider } from "@mantine/modals";
import Users from "./pages/main/users/users";
import Department from "./pages/main/department/Department";
import EmployeeMapping from "./pages/main/department/mappingEmployees/EmployeeMapping";
import Permission from "./pages/main/requests/permission/Permission";
import ApprovePermission from "./pages/main/approval/permission/PermissionApproval";
import Profile from "./pages/main/profile/Profile";
import NoticeBoard from "./pages/main/noticeBoard/NoticeBoard";
import UserDocument from "./pages/main/users/userDocuments/userDocument";
import Dashboard from "./pages/main/dashboard/Dashboard.tsx";
import ApproveNotice from "./pages/main/approval/notice/ApproveNotice";
import ApproveLeave from "./pages/main/approval/leave/ApproveLeave.tsx";
import LeaveStats from "./pages/main/stats/leaveStats/LeaveStats.tsx";
import PermissioStats from "./pages/main/stats/permissionstats/PermissionStats.tsx";
import ViewLeaveStats from "./pages/main/stats/leaveStats/ViewLeaveStats.tsx";
import ViewPermissionStats from "./pages/main/stats/permissionstats/ViewPermissionStats.tsx";

export default function App() {
  const location = useLocation();
  const roleId = localStorage.getItem("roleId")?.toString();

  const PrivateRoute = ({ roleId, allowedRoutes, children }: any) => {
    return allowedRoutes.includes(roleId) ? (
      children
    ) : (
      <Navigate to="/dashboard" />
    );
  };

  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassowrd />} />
              <Route path="/" element={<Home />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="users" element={<Outlet />}>
                  <Route
                    path=""
                    element={
                      <PrivateRoute
                        roleId={roleId}
                        allowedRoutes={["1", "2", "3"]}
                      >
                        <Users />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="document/:name/:id"
                    element={
                      <PrivateRoute
                        roleId={roleId}
                        allowedRoutes={["1", "2", "3"]}
                      >
                        <UserDocument />
                      </PrivateRoute>
                    }
                  />
                </Route>

                <Route
                  path="approve/leave"
                  element={
                    <PrivateRoute
                      roleId={roleId}
                      allowedRoutes={["1", "2", "3", "4"]}
                    >
                      <ApproveLeave />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="approve/permission"
                  element={
                    <PrivateRoute
                      roleId={roleId}
                      allowedRoutes={["1", "2", "3", "4"]}
                    >
                      <ApprovePermission />
                    </PrivateRoute>
                  }
                />

                <Route path="department" element={<Outlet />}>
                  <Route
                    path=""
                    element={
                      <PrivateRoute
                        roleId={roleId}
                        allowedRoutes={["1", "2", "3"]}
                      >
                        <Department />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="employees/:id/:name"
                    element={
                      <PrivateRoute
                        roleId={roleId}
                        allowedRoutes={["1", "2", "3"]}
                      >
                        <EmployeeMapping />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route
                  path="requests/leave"
                  element={
                    <PrivateRoute
                      roleId={roleId}
                      allowedRoutes={["3", "4", "5"]}
                    >
                      <Leave />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="requests/permission"
                  element={
                    <PrivateRoute
                      roleId={roleId}
                      allowedRoutes={["3", "4", "5"]}
                    >
                      <Permission />
                    </PrivateRoute>
                  }
                />

                <Route path="noticeboard" element={<NoticeBoard />} />
                <Route
                  path="noticeapproval"
                  element={
                    <PrivateRoute roleId={roleId} allowedRoutes={["2", "3"]}>
                      <ApproveNotice />
                    </PrivateRoute>
                  }
                />
                <Route path="stats/leave" element={<Outlet />}>
                  <Route path="" element={<LeaveStats />} />
                  <Route
                    path="details/:name/:id"
                    element={
                      <PrivateRoute
                        roleId={roleId}
                        allowedRoutes={["1", "2", "3"]}
                      >
                        <ViewLeaveStats />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route path="stats/permission" element={<Outlet />}>
                  <Route path="" element={<PermissioStats />} />
                  <Route
                    path="details/:name/:id"
                    element={
                      <PrivateRoute
                        roleId={roleId}
                        allowedRoutes={["1", "2", "3"]}
                      >
                        <ViewPermissionStats />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
