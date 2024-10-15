import { Pagination as MantinePagination } from "@mantine/core";
import {
  IconArrowRight,
  IconArrowLeft,
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconGripHorizontal,
} from "@tabler/icons-react";
import React from "react";

interface PaginationProps {
  from: number;
  to: number;
  total: number;
  totalPages: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
  isLoading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  totalPages,
  currentPage,
  onPageChanged,
  from,
  to,
  isLoading,
}) => {
  return (
    <React.Fragment>
      {total > 0 && (
        <section className="w-full max-lg:space-y-2 lg:flex lg:items-center lg:justify-between">
          <div className="mr-4 text-slate-900 lg:text-lg">
            Showing {from} to {to} of {total} entries
          </div>
          <div className="lg:flex lg:items-center lg:justify-end">
            <MantinePagination
              withEdges
              nextIcon={IconArrowRight}
              previousIcon={IconArrowLeft}
              firstIcon={IconArrowBarToLeft}
              lastIcon={IconArrowBarToRight}
              dotsIcon={IconGripHorizontal}
              total={isLoading ? 1 : totalPages}
              value={isLoading ? 0 : currentPage}
              color="#0284c7"
              onChange={isLoading ? () => {} : onPageChanged}
              size={"sm"}
              siblings={0}
              className="block lg:hidden"
            />
            <MantinePagination
              withEdges
              nextIcon={IconArrowRight}
              previousIcon={IconArrowLeft}
              firstIcon={IconArrowBarToLeft}
              lastIcon={IconArrowBarToRight}
              dotsIcon={IconGripHorizontal}
              total={isLoading ? 1 : totalPages}
              value={isLoading ? 0 : currentPage}
              color="#0284c7"
              onChange={isLoading ? () => {} : onPageChanged}
              size={"md"}
              siblings={0}
              className="hidden lg:block"
            />
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Pagination;
