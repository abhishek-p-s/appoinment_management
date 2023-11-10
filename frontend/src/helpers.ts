import { useEffect, useState } from 'react';

//custom hook for checking screenwidth
export const useScreenWidth = (): number => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

//function for creating the antd select options with label and value
export const createSelectOption = (
  arr: any[],
  value: string,
  label: string
) => {
  const newArr = arr.map((item) => {
    return {
      value: item[value],
      label: item[label],
    };
  });
  return newArr;
};

//taking the auth and passing to the authorization
export const getAuthHeaders = () => ({
  Authorization: `Bearer ${
    JSON.parse(localStorage.getItem('userInfo') || '').token
  }`,
});

//comman function for checking the object is empty or not
export const isObjectEmpty = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};
