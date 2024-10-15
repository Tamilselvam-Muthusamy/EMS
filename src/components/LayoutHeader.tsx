import { Button } from "@mantine/core";
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface LayoutHeaderProps {
  inputRef: React.RefObject<HTMLInputElement>;
  title: any;
  addTitle?: string;
  filterTiltle?: string;
  icon?: any;
  placeholder: string;
  showSearchField: boolean;
  showAddButton: boolean;
  showFilterButton: boolean;
  isFilterApplied?: boolean;
  onAddClick?: () => void;
  onFilterClick?: () => void;
  onSearchSubmit: () => void;
}

export default function LayoutHeader({
  title,
  showAddButton,
  addTitle,
  filterTiltle,
  showFilterButton,
  onAddClick,
  onFilterClick,
  isFilterApplied,
  showSearchField,
  inputRef,
  placeholder,
  onSearchSubmit,
}: LayoutHeaderProps): React.JSX.Element {
  return (
    <motion.div
      className="w-full space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.2 }}
    >
      <motion.h1
        className="w-full text-2xl lg:text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {title}
      </motion.h1>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end lg:pr-2">
        {showSearchField && (
          <Search
            placeholder={placeholder}
            inputRef={inputRef}
            onSubmit={onSearchSubmit}
          />
        )}

        <div className="flex items-center justify-end space-x-2 px-1 lg:pl-2 lg:mt-0 mt-2 lg:w-auto w-full">
          {showFilterButton && (
            <Button
              color={isFilterApplied ? "orange" : "gray"}
              variant="outline"
              className="flex items-center justify-center max-lg:h-10 lg:h-11"
              onClick={onFilterClick}
            >
              <FunnelIcon className="h-6 w-6" />
              <span className="hidden xl:block">
                {filterTiltle ? filterTiltle : "Filter"}
              </span>
            </Button>
          )}
          {showAddButton && (
            <Button
              variant="filled"
              className="flex items-center justify-center bg-sky-500 max-lg:h-10 lg:h-11"
              onClick={onAddClick}
            >
              <PlusIcon className="h-6 w-6" />
              <span className="hidden xl:block">
                {addTitle ? addTitle : "Add"}
              </span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface SearchProps {
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onSubmit: () => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, onSubmit, inputRef }) => {
  return (
    <div className="relative w-full lg:w-1/2">
      <input
        ref={inputRef}
        type="search"
        id="default-search"
        className="peer block w-full rounded-lg border border-slate-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 outline-2 placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        placeholder={placeholder}
        required
        onChange={() => onSubmit()}
      />
    </div>
  );
};
