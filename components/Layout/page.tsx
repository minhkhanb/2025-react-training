import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Header } from "./components/Header/page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen">
      <SidebarProvider>
        <Header />
        <main className="w-full h-screen p-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
