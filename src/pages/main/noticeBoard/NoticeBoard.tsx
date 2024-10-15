import { useEffect, useState } from "react";
import { NoticeBoardStore } from "./NoticeBoardStore";
import { Badge, Button, Table } from "@mantine/core";
import moment from "moment";
import CustomTable from "@src/components/CustomTable";
import ApplyNotice from "./ApplyNotice";
import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";

function NoticeBoard() {
  const [open, setOpen] = useState(false);
  const { data, page, search, fetchData, loading } = NoticeBoardStore();

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div className="w-full space-y-2">
      <motion.div
        className="grid w-full grid-cols-6 items-center gap-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
      >
        <motion.h1
          className="col-span-1 w-full text-2xl lg:col
        -span-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Apply Notice
        </motion.h1>
        <div className="col-span-6 flex items-center space-x-2 px-1 max-sm:pl-2 lg:col-span-6 lg:justify-end lg:pl-2 lg:pr-28">
          {data != null ? (
            <></>
          ) : (
            <Button
              variant="filled"
              className="flex items-center justify-center bg-sky-500 max-lg:h-10 lg:h-11"
              onClick={() => setOpen(true)}
            >
              <PlusIcon className="h-6 w-6" />
              <span className="hidden xl:block">{"Apply Notice"}</span>
            </Button>
          )}
        </div>
      </motion.div>
      <ApplyNotice opened={open} closed={setOpen} />

      <CustomTable
        isLoading={loading}
        columns={[
          "S.no",
          "Name",
          "Remarks",
          "Applied Date",
          "Notice End Date",
          "Approved Status",
          "Approved BY",
        ]}
        total={data?.departmentMember ? 1 : 0}
      >
        <Table.Tr>
          <Table.Td>{1}</Table.Td>
          <Table.Td>{data?.departmentMember ?? "None"}</Table.Td>
          <Table.Td>{data?.remarks ?? "None"}</Table.Td>
          <Table.Td>
            {moment(data?.createdAt).format("DD MMMM YYYY") ?? "None"}
          </Table.Td>
          <Table.Td>
            {data?.noticeEndDate == null
              ? "None"
              : moment(data?.noticeEndDate).format("DD MMMM YYYY") ?? "None"}
          </Table.Td>

          <Table.Td>
            <Badge
              size="md"
              variant="light"
              color={data?.isApproved ? "green" : "red"}
            >
              {data?.isApproved ? "Approved" : "Pending"}
            </Badge>
          </Table.Td>
          <Table.Td>
            {data?.approvedBy == null ? "None" : data?.approvedBy}
          </Table.Td>
        </Table.Tr>
      </CustomTable>
    </div>
  );
}

export default NoticeBoard;
