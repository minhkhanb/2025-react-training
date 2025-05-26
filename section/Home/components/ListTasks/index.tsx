import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import PaginationElement from "./components/Pagination";
import TableList from "./components/TableList";

const ListTasks = () => {
  return (
    <div className="w-full h-[390px] flex flex-col gap-2 justify-between">
      <Sheet>
        <TableList />
        <PaginationElement />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ListTasks;
