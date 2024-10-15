import { Table } from "@mantine/core";
import { TableSkeleton } from "./Index";

interface TableProps {
  isLoading: boolean;
  columns: string[];
  total: number;
  children: React.ReactNode;
}

function CustomTable({
  isLoading = true,
  columns,
  total,
  children,
}: TableProps) {
  return (
    <Table.ScrollContainer
      minWidth={375}
      className="w-full rounded-lg bg-sky-50 px-2 pt-2"
    >
      <Table
        withTableBorder
        highlightOnHover
        withColumnBorders
        horizontalSpacing={"sm"}
        className="whitespace-nowrap bg-white"
      >
        <Table.Thead>
          <Table.Tr>
            {columns.map((heading, index) => (
              <Table.Th key={index} className="uppercase">
                {heading}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isLoading ? (
            <TableSkeleton columns={columns} />
          ) : total > 0 ? (
            <>{children}</>
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.length} className="text-center">
                No Data found
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default CustomTable;
