import { Home, LayoutList, Accessibility } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 font-bold text-lg">My Dashboard</div>
      <nav className="space-y-1 px-4">
        <NavItem href="/" icon={<Home className="h-5 w-5" />}>
          Home
        </NavItem>
        <NavItem href="/todos" icon={<LayoutList className="h-5 w-5" />}>
          Todos
        </NavItem>
        <NavItem href="/example" icon={<Accessibility className="h-5 w-5" />}>
          Example
        </NavItem>
      </nav>
    </aside>
  );
};

export default Sidebar;
