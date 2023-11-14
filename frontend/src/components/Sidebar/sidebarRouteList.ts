//if we need to hide any route from the sidebar add the user role id in the user array
export const menuList = [
  {
    name: 'Dashboard',
    key: '/home',
    icon: 'iwwa:dashboard',
    user: [3, 2],
  },
  {
    name: 'Users',
    key: '/user-list',
    icon: 'la:users-cog',
    user: [3, 2],
  },
  {
    name: 'Patients',
    key: '/patients',
    icon: 'mdi:patient-outline',
    user: [3],
  },
  {
    name: 'appointments',
    key: 'appointments',
    icon: 'streamline:open-book',
    children: [
      {
        name: 'Appoinments List',
        key: '/appoinments-list',
        user: [],
      },
    ],
  },
];
