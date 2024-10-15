import { Skeleton, Table } from "@mantine/core";

function TableSkeleton({ columns }: { columns: string[] }) {
  const noOfRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {noOfRows.map((rows) => (
        <Table.Tr key={rows}>
          {columns.map((column) => (
            <Table.Td key={column} className="py-2">
              <Skeleton width={"80%"} height={8} radius="sm" />
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </>
  );
}

export default TableSkeleton;
