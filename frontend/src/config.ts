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
        'docter',
        'patient',
      ],
    },
    {
      id: 2,
      name: 'Docter',
      page_access: [
        'docter',
      ],
    },
    {
      id: 3,
      name: 'Patient',
      page_access: [
        'patient',
      ],
    }
  ] as Role[],
  checkAccess: (role: any, page: string) => {
    return config.roles
      .find((user) => user.id === role)
      ?.page_access.includes(page);
  },
};

export default config;
