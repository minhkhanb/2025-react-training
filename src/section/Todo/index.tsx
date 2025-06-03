"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import {
  Task,
  TaskFilter,
  useTaskStore,
} from "@/components/providers/TaskProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import ListTasks from "./components/ListTasks";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import { queryClient } from "@/core/instances/query";
import { Option, SelectCustomize } from "@/components/ui-custom/select";
import { Input } from "@/components/ui/input";

const HomePageContent = () => {
  const [visibleConfirmDelete, setvisibleConfirmDelete] = useState(false);

  const filter = useTaskStore((state) => state.filter);

  const setFilter = useTaskStore((state) => state.setFilter);

  const [currentTask, setCurrentTask] = useState<Task | undefined>();

  const [filterTitle, setFilterTitle] = useState("");

  const router = useRouter();

  const filterOptions: Option[] = [
    {
      label: "All",
      value: "all-tasks",
    },
    {
      label: "Completed",
      value: "completed-tasks",
    },
  ];

  const onConfirmDeleteTask = (task: Task) => {
    setCurrentTask(task);
    setvisibleConfirmDelete(true);
  };

  const onCloseDeleteTask = () => {
    setvisibleConfirmDelete(false);
    setCurrentTask(undefined);
  };

  return (
    <>
      <div className="w-full p-2">
        <h1 className="text-2xl font-semibold">Todo</h1>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-medium mt-4">Today, 22 April</h2>
          <Button
            onClick={() => router.push("/todo/add")}
            className="bg-green-500 hover:bg-green-400 transition-all duration-300 cursor-pointer"
          >
            <PlusCircle />
            <p>New Task</p>
          </Button>
        </div>
        <div className="py-2 flex items-center gap-2">
          <SelectCustomize
            className="w-32"
            onChange={(value) => setFilter(value as TaskFilter)}
            options={filterOptions}
            value={filter}
          />
          <Input
            placeholder="Filter Title..."
            value={filterTitle}
            onChange={(event) => setFilterTitle(event.target.value)}
            className="max-w-50"
          />
          {/* <Input
            placeholder="Filter Title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          /> */}
        </div>
        <ListTasks onConfirmDeleteTask={onConfirmDeleteTask} />
      </div>
      <DeleteConfirmation
        currentTask={currentTask}
        visible={visibleConfirmDelete}
        onClose={onCloseDeleteTask}
      />
    </>
  );
};

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePageContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default HomePage;
