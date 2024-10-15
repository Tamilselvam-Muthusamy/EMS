import React, { useState } from "react";
import clsx from "clsx";
import {
  UsersIcon,
  PowerIcon,
  ClipboardDocumentListIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi2";
import {
  IconBriefcase,
  IconMailQuestion,
  IconCircleDashedCheck,
  IconFileText,
  IconFileTime,
  IconCheckupList,
  IconChartPie,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { Accordion, Button, Group, LoadingOverlay, Text } from "@mantine/core";
import apiProvider from "@src/network/apiProvider";

export default function Sidenav() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function signOut() {
    setIsLoading(true);
    const response = await apiProvider.logOut();
    if (response?.status) {
      localStorage.clear();
      navigate("/");
      modals.closeAll();
    } else {
      setIsLoading(false);
    }
  }
  const openLogoutModal = () =>
    modals.open({
      title: `Sign out`,
      padding: "lg",
      centered: true,
      overlayProps: { backgroundOpacity: 0.2, blur: 1 },
      yOffset: 30,
      children: (
        <>
          <LoadingOverlay visible={isLoading} />
          <Text c="gray">Are you sure you want to Sign out?</Text>
          <Group className="flex justify-end">
            <Button variant="default" onClick={() => modals.closeAll()} mt="md">
              No
            </Button>
            <Button
              style={{ backgroundColor: "primary", color: "white" }}
              onClick={() => signOut()}
              mt="md"
              loading={isLoading}
            >
              Yes
            </Button>
          </Group>
        </>
      ),
    });
  return (
    <div className="flex h-full flex-col overflow-x-auto py-2 md:px-2 md:py-4">
      <NavLink
        className="flex h-16 items-center justify-center space-x-0.5 rounded-t-md bg-sky-500 p-4 transition-all duration-75 ease-out active:scale-95 md:mb-1 md:rounded-md"
        to="/dashboard"
      >
        <HiUserGroup className="text-4xl text-white" size={40} />
        <div className="text-3xl font-extrabold tracking-wider text-white">
          EMS
        </div>
      </NavLink>
      <div className="flex grow flex-row justify-between rounded-b-md overflow-x-auto bg-white p-2 shadow-md max-md:space-x-2 md:flex-col md:space-y-2 md:rounded-md md:p-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-white md:block"></div>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            clsx(
              "flex h-[48px] grow transform items-center justify-center b gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
              {
                "bg-sky-500 text-white shadow-md": isActive,
                "text-gray-700 bg-sky-200": !isActive,
              }
            )
          }
        >
          <RiUserSettingsLine size={25} />
          <div className="hidden md:block">Profile</div>
        </NavLink>
        <button
          onClick={openLogoutModal}
          className="flex h-[48px] w-full grow cursor-pointer items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium text-gray-700 transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white active:scale-95 md:mb-2 md:flex-none md:justify-start md:bg-sky-200 md:p-2 md:px-3 md:text-gray-700"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign out</div>
        </button>
      </div>
    </div>
  );
}

export function NavLinks() {
  const location = useLocation();
  const isRequest = location.pathname.startsWith("/requests");
  const isApproval = location.pathname.startsWith("/approve");
  const isStats = location.pathname.startsWith("/stats");

  const roleId = localStorage.getItem("roleId");

  return (
    <React.Fragment>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          clsx(
            "flex h-[48px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
            {
              "bg-sky-500 text-white shadow-md": isActive,
              "text-gray-700": !isActive,
            }
          )
        }
      >
        <ComputerDesktopIcon className="w-6" />
        <p className="hidden md:block md:text-base">Dashboard</p>
      </NavLink>
      {(roleId == "1" || roleId == "2" || roleId == "3") && (
        <NavLink
          to="/users"
          className={({ isActive }) =>
            clsx(
              "flex h-[48px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
              {
                "bg-sky-500 text-white shadow-md": isActive,
                "text-gray-700": !isActive,
              }
            )
          }
        >
          <UsersIcon className="w-6" />
          <p className="hidden md:block md:text-base">Users</p>
        </NavLink>
      )}

      {(roleId == "1" || roleId == "2" || roleId == "3") && (
        <Accordion variant="filled">
          <Accordion.Item value="1">
            <Accordion.Control
              icon={<IconChartPie className="w-6" />}
              className={clsx(
                "flex h-[48px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                {
                  "bg-sky-500 text-white shadow-md": isStats,
                  "text-gray-700": !isStats,
                }
              )}
            >
              {" "}
              <p className="hidden md:block md:text-base">Stats</p>
            </Accordion.Control>
            <Accordion.Panel className="h-12">
              {" "}
              <NavLink
                to="stats/leave"
                className={({ isActive }) =>
                  clsx(
                    "flex h-[40px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                    {
                      "bg-sky-500 text-white shadow-md": isActive,
                      "text-gray-700": !isActive,
                    }
                  )
                }
              >
                <IconFileText className="w-6" />
                <p className="hidden md:block md:text-base">Leave Stats</p>
              </NavLink>
            </Accordion.Panel>

            <Accordion.Panel className="h-12">
              <NavLink
                to="stats/permission"
                className={({ isActive }) =>
                  clsx(
                    "flex h-[40px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                    {
                      "bg-sky-500 text-white shadow-md": isActive,
                      "text-gray-700": !isActive,
                    }
                  )
                }
              >
                <IconFileTime className="w-6" />
                <p className="hidden md:block md:text-base">Permission Stats</p>
              </NavLink>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}

      {(roleId == "1" || roleId == "2") && (
        <NavLink
          to="/department"
          className={({ isActive }) =>
            clsx(
              "flex h-[48px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
              {
                "bg-sky-500 text-white shadow-md": isActive,
                "text-gray-700": !isActive,
              }
            )
          }
        >
          <IconBriefcase className="w-6" />
          <p className="hidden md:block md:text-base">Department</p>
        </NavLink>
      )}
      {(roleId == "3" || roleId == "4" || roleId == "5") && (
        <Accordion variant="filled">
          <Accordion.Item value="1">
            <Accordion.Control
              icon={<IconMailQuestion className="w-6" />}
              className={clsx(
                "flex h-[48px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                {
                  "bg-sky-500 text-white shadow-md": isRequest,
                  "text-gray-700": !isRequest,
                }
              )}
            >
              {" "}
              <p className="hidden md:block md:text-base">Request</p>
            </Accordion.Control>
            <Accordion.Panel className="h-12">
              {" "}
              <NavLink
                to="/requests/leave"
                className={({ isActive }) =>
                  clsx(
                    "flex h-[40px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                    {
                      "bg-sky-500 text-white shadow-md": isActive,
                      "text-gray-700": !isActive,
                    }
                  )
                }
              >
                <IconFileText className="w-6" />
                <p className="hidden md:block md:text-base">Leave</p>
              </NavLink>
            </Accordion.Panel>

            <Accordion.Panel className="h-12">
              <NavLink
                to="/requests/permission"
                className={({ isActive }) =>
                  clsx(
                    "flex h-[40px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                    {
                      "bg-sky-500 text-white shadow-md": isActive,
                      "text-gray-700": !isActive,
                    }
                  )
                }
              >
                <IconFileTime className="w-6" />
                <p className="hidden md:block md:text-base">Permission</p>
              </NavLink>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}

      {(roleId == "2" || roleId == "4") && (
        <Accordion variant="filled">
          <Accordion.Item value="1">
            <Accordion.Control
              icon={<IconCircleDashedCheck className="w-6" />}
              className={clsx(
                "flex h-[48px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                {
                  "bg-sky-500 text-white shadow-md": isApproval,
                  "text-gray-700": !isApproval,
                }
              )}
            >
              {" "}
              <p className="hidden md:block md:text-base">Approval</p>
            </Accordion.Control>
            <Accordion.Panel className="h-12">
              {" "}
              <NavLink
                to="/approve/leave"
                className={({ isActive }) =>
                  clsx(
                    "flex h-[40px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                    {
                      "bg-sky-500 text-white shadow-md": isActive,
                      "text-gray-700": !isActive,
                    }
                  )
                }
              >
                <IconFileText className="w-6" />
                <p className="hidden md:block md:text-base">Leave</p>
              </NavLink>
            </Accordion.Panel>

            <Accordion.Panel className="h-12">
              <NavLink
                to="/approve/permission"
                className={({ isActive }) =>
                  clsx(
                    "flex h-[40px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
                    {
                      "bg-sky-500 text-white shadow-md": isActive,
                      "text-gray-700": !isActive,
                    }
                  )
                }
              >
                <IconFileTime className="w-6" />
                <p className="hidden md:block md:text-base">Permission</p>
              </NavLink>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}

      {roleId == "1" || roleId == "2" ? (
        <></>
      ) : (
        <NavLink
          to="/noticeboard"
          className={({ isActive }) =>
            clsx(
              "flex h-[48px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
              {
                "bg-sky-500 text-white shadow-md": isActive,
                "text-gray-700": !isActive,
              }
            )
          }
        >
          <ClipboardDocumentListIcon className="w-6" />
          <p className="hidden md:block md:text-base">Notice Board</p>
        </NavLink>
      )}

      {(roleId == "2" || roleId == "3") && (
        <NavLink
          to="/noticeapproval"
          className={({ isActive }) =>
            clsx(
              "flex h-[48px] grow transform items-center justify-center gap-1.5 rounded-md text-sm font-medium transition duration-75 ease-in-out hover:bg-sky-500 hover:text-white md:flex-none md:justify-start md:pl-3",
              {
                "bg-sky-500 text-white shadow-md": isActive,
                "text-gray-700": !isActive,
              }
            )
          }
        >
          <IconCheckupList className="w-6" />
          <p className="hidden md:block md:text-base">Approve Notice</p>
        </NavLink>
      )}
    </React.Fragment>
  );
}
