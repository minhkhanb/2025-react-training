'use client';

import { LayoutDashboard, Users } from 'lucide-react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@src/components/shadcn/ui/sidebar';
import { NavUser } from './NavUser';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
  },
];

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  id: '1',
  isActive: true,
  lastLoginAt: new Date(),
  loginAttempts: 0,
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-indigo-600">
        <img src="/logo.svg" alt="logo" className="h-12 w-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{user && <NavUser user={user} />}</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
