export type Role = {
  id: number;
  name: string;
  page_access: string[];
};

const config = {
  roles: [
    {
      id: 1,
      name: 'Admin',
      page_access: [
        'home',
      ],
    },
    {
      id: 2,
      name: 'Docter',
      page_access: [],
    },
    {
      id: 3,
      name: 'Patient',
      page_access: [],
    }
  ] as Role[],
  checkAccess: (role: any, page: string) => {
    return config.roles
      .find((user) => user.id === role)
      ?.page_access.includes(page);
  },
};

export default config;
