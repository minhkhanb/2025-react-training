import { useTask } from "@/components/providers/TaskProvider";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const PaginationElement = () => {
  const {
    pagination,
    currentLimit,
    currentPage,
    setCurrentLimit,
    setCurrentPage,
  } = useTask();

  return (
    <div className="flex items-center justify-end w-full">
      <Pagination className="w-full flex justify-end gap-2">
        <Select
          onValueChange={(value) => setCurrentLimit(Number(value))}
          defaultValue={currentLimit + ""}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectContent>
        </Select>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (pagination?.hasPreviousPage) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              className={cn(
                "text-black cursor-pointer",
                !pagination?.hasPreviousPage &&
                  "text-gray-300 hover:text-gray-300 cursor-auto"
              )}
            />
          </PaginationItem>
          {Array.from({ length: pagination?.totalPages || 0 }).map(
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (pagination?.hasNextPage) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              className={cn(
                "text-black cursor-pointer",
                !pagination?.hasNextPage &&
                  "text-gray-300 hover:text-gray-300 cursor-auto"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationElement;
