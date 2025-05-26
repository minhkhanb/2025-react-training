"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import TaskProvider from "@/components/providers/TaskProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListTasks from "./components/ListTasks";
import AddNewDialog from "./components/AddNewDialog";

const queryClient = new QueryClient();

const HomePage = () => {
  const [visibleAddNew, setVisibleAddNew] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <div className="w-full p-2">
          <h1 className="text-2xl font-semibold">Todo</h1>
          <div className="flex w-full items-center justify-between">
            <h2 className="text-lg font-medium mt-4">Today, 22 April</h2>
            <Button
              onClick={() => setVisibleAddNew(true)}
              className="bg-blue-500 hover:bg-blue-400 transition-all duration-300 cursor-pointer"
            >
              <PlusCircle />
              <p>New Task</p>
            </Button>
          </div>
          <Tabs defaultValue="account" className="w-full mt-4">
            <TabsList className="bg-none">
              <TabsTrigger value="account">All</TabsTrigger>
              <TabsTrigger value="password">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="h-[500px]">
              <ListTasks />
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
        <AddNewDialog
          visible={visibleAddNew}
          onClose={() => setVisibleAddNew(false)}
        />
      </TaskProvider>
    </QueryClientProvider>
  );
};

export default HomePage;
