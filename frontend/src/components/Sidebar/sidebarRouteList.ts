//if we need to hide any route from the sidebar add the user role id in the user array
export const menuList = [
  {
    name: 'Dashboard',
    key: '/',
    icon: 'iwwa:dashboard',
  },
  {
    name: 'Doctors',
    key: 'timesheet',
    icon: 'simple-line-icons:graduation',
    children: [
      {
        name: 'Fill timesheet',
        key: '/fill-timesheet',
        user: [],
      },
      {
        name: 'View timesheet',
        key: '/view-timesheet',
        user: [],
      },
      {
        name: 'Approval',
        key: '/approve-timesheet',
        user: [4], //This route won't show for the user id 4
      },
      {
        name: 'Missing Timesheet-Reportees',
        key: '/pending-timesheet',
        user: [4],
      },
    ],
  },
  {
    name: 'Patients',
    key: 'leave',
    icon: 'mdi:patient-outline',
    children: [
      {
        name: 'Leave Request',
        key: '/leave-request',
        user: [],
      },
      {
        name: 'Leave History',
        key: '/leave-history',
        user: [],
      },
      {
        name: 'SOP Leave',
        key: '/sop-leave',
        user: [],
      },
      {
        name: 'Holiday List',
        key: '/holiday-list',
        user: [],
      },
      {
        name: 'Approval',
        key: '/approval-list',
        user: [4],
      },
      {
        name: 'Leave List',
        key: '/leave-list',
        user: [],
      },
    ],
  },
  {
    name: 'appointments',
    key: 'travel',
    icon: 'streamline:open-book',
    children: [
      {
        name: 'Request',
        key: '/travel-request',
        user: [],
      },
      {
        name: 'History',
        key: '/travel-history',
        user: [],
      },
      {
        name: 'Approval',
        key: '/travel-approval',
        user: [4],
      },
      {
        name: 'Policy',
        key: '/travel-policy',
        user: [4],
      },
    ],
  },
];
