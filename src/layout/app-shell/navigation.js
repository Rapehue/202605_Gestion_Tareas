import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Users
} from 'lucide-react';

export const navigation = [

  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard
  },

  {
    label: 'Proyectos',
    path: '/proyectos',
    icon: FolderKanban
  },

  {
    label: 'Work Orders',
    path: '/workorders',
    icon: ClipboardList
  },

  {
    label: 'Usuarios',
    path: '/usuarios',
    icon: Users
  }

];