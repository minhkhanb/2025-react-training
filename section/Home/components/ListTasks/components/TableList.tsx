import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { useTask } from "@/components/providers/TaskProvider";

const TableList = () => {
  const { tasks, handleRemoveTask, handleUpdateTask } = useTask();
  return (
    <Table>
      <TableHeader className="bg-gray-50 top-0 z-10 sticky">
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className="cursor-pointer">
            <TableCell className="w-[25%]">{task.title}</TableCell>
            <TableCell className="w-[40%]">{task.subtitle}</TableCell>
            <TableCell>
              <Select
                onValueChange={(value) => {
                  const isComplete = value === "true";
                  handleUpdateTask({ ...task, isComplete });
                }}
                defaultValue={task.isComplete + ""}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Success</SelectItem>
                  <SelectItem value="false">Pending</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="flex items-center gap-2 justify-center">
              <Button className="bg-blue-500 hover:bg-blue-400 cursor-pointer size-8">
                <Pen />
              </Button>
              <Button
                onClick={() => handleRemoveTask(task.id)}
                className="bg-red-500 hover:bg-red-400 cursor-pointer size-8"
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableList;
