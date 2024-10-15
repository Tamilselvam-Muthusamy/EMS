import { ActionIcon, Button, Table } from "@mantine/core";
import LayoutHeader from "@src/components/LayoutHeader";
import apiProvider from "@src/network/apiProvider";
import { IconArrowLeft, IconEye } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UploadDocument from "./UploadDocument";
import { DocumentStore } from "./DocumentStore";
import RemoveDocument from "./RemoveDocument";

function UserDocument() {
  const { id, name } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const { data, fetchData } = DocumentStore();

  const handleAddClick = () => {
    setOpen(true);
  };

  async function viewData(value: any) {
    const data = {
      path: value,
    };
    const result = await apiProvider.downloadFiles(data);
    const blob = new Blob([result?.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <div className="w-full space-y-2">
      <LayoutHeader
        showSearchField={false}
        title={
          <div className="flex space-x-3">
            <Link to="/users">
              <ActionIcon radius="xl" variant="default" size="28px">
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Link>
            <p>{`${name}'s documents`}</p>
          </div>
        }
        inputRef={inputRef}
        placeholder="Search document..."
        showAddButton={true}
        addTitle="Upload document"
        showFilterButton={false}
        onAddClick={() => handleAddClick()}
        onFilterClick={() => {}}
        onSearchSubmit={() => {}}
      />
      <UploadDocument opened={open} closed={setOpen} />
      <Table
        withTableBorder
        highlightOnHover
        withColumnBorders
        horizontalSpacing={"sm"}
        className="whitespace-nowrap bg-white"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.NO</Table.Th>
            <Table.Th>FILE PATH</Table.Th>
            <Table.Th>ACTION</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data == null ? (
            <Table.Tr>
              <Table.Td colSpan={3} className="text-center">
                No Data found
              </Table.Td>
            </Table.Tr>
          ) : (
            <>
              {data?.map((value: any) => {
                return (
                  <>
                    {value?.filePaths
                      .split(",")
                      .map((value1: any, index1: number) => (
                        <Table.Tr>
                          <Table.Td>{index1 + 1}</Table.Td>
                          <Table.Td>{value1.split("/")[2]}</Table.Td>
                          <Table.Td>
                            <div className="flex space-x-3">
                              <Button
                                onClick={() => viewData(value1)}
                                variant="light"
                                size="compact-sm"
                                leftSection={<IconEye size={12} />}
                              >
                                view
                              </Button>
                              <RemoveDocument documentData={value1} />
                            </div>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                  </>
                );
              })}
            </>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
}

export default UserDocument;
