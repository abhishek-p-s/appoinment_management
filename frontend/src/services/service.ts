import axios from 'axios';

export const config = {
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
};

function authHeader() {
  const userInfo = localStorage.getItem('userInfo');
  const token = userInfo ? JSON.parse(userInfo).token : null;
  if (token) {
    return 'Bearer ' + token;
  } else {
    return {};
  }
}

const API = () => {
  const getConfig: any = () => {
    return api
      ? {
          ...config,
          headers: {
            ...config.headers,
            Authorization: authHeader(),
          },
        }
      : config;
  };
  return {
    token: '',
    get: (url: string, config = {}) =>
      axios({ url, ...getConfig(), ...config }),
    post: (url: string, data: any, config = {}) =>
      axios({ url, method: 'POST', data, ...getConfig(), ...config }),
    put: (url: string, data: any, config: any) =>
      axios({ url, method: 'PUT', data, ...getConfig(), ...config }),
    patch: (url: string, data: any, config: any) =>
      axios({ url, method: 'PATCH', data, ...getConfig(), ...config }),
    delete: (url: string) => axios({ url, method: 'DELETE', ...getConfig() }),
    setToken: (token: string) => {
      api.token = token;
    },
  };
};
const api = API();

export default api;
