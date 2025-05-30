"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Layout from "../Layout";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const ignoreLayoutRoutes = ["/", "/auth/sign-in"];

  if (ignoreLayoutRoutes.includes(pathname)) return <>{children}</>;

  return <Layout>{children}</Layout>;
};

export default LayoutWrapper;
