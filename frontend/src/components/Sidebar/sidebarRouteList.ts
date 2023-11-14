//if we need to hide any route from the sidebar add the user role id in the user array
export const menuList = [
  {
    name: 'Dashboard',
    key: '/',
    icon: 'iwwa:dashboard',
    user: [2],
  },
  {
    name: 'Users',
    key: '/user-list',
    icon: 'la:users-cog',
  },
  {
    name: 'Patients',
    key: 'patients',
    icon: 'mdi:patient-outline',
    user: [2,3],
    children: [
      {
        name: 'Patients List',
        key: '/patients',
        user: [2,3],
      },
    ],
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
