import { Icon } from '@iconify/react/dist/iconify.js';
import { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSidebarOpenedTabs } from '../../redux/slices/sidebarTogle';
import { RootState } from '../../redux/store';
import { menuList } from './sidebarRouteList';

const SidebarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpenedTabs } = useSelector(
    (state: RootState) => state.isSidebarOpen
  );
  const { userDetails } = useSelector((state: RootState) => state.user);
  const activeMenuClass: string =
    'bg-primary text-white rounded-md flex justify-between items-center h-[40px]';
  const [activeMenus, setActiveMenus] = useState<{ [key: string]: boolean }>(
    sidebarOpenedTabs
  );

  const handleActiveMenu = (key: string) => {
    const updatedActiveMenus: { [key: string]: boolean } = {};
    for (const menu of menuList) {
      if (menu.key === key) {
        updatedActiveMenus[key] = !activeMenus[key];
      } else {
        updatedActiveMenus[menu.key] = false;
      }
    }
    setActiveMenus(updatedActiveMenus);
    dispatch(setSidebarOpenedTabs({ [key]: !activeMenus[key] }));
  };

  //making active tabs according to the route change
  useMemo(() => {
    const updatedActiveMenus = { ...activeMenus };
    for (const menu of menuList) {
      if (
        menu.key === location.pathname ||
        (menu.children &&
          menu.children.some((child) => child.key === location.pathname))
      ) {
        updatedActiveMenus[menu.key] = true;
      } else {
        updatedActiveMenus[menu.key] = false;
      }
    }
    setActiveMenus(updatedActiveMenus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      <ul className="leading-[3rem]">
        {menuList.map((menu) => {
          if (menu.children) {
            return (
              <li key={menu.key}>
                <a
                  href="#"
                  className={
                    activeMenus[menu.key]
                      ? activeMenuClass
                      : 'flex justify-between text-primary cursor-pointer items-center font-semibold text-[16px]'
                  }
                  onClick={() => {
                    handleActiveMenu(menu.key);
                  }}
                >
                  <div className="flex flex-start items-center">
                    <Icon icon={menu.icon} className="w-5 h-5 ml-[1rem]" />
                    <span className="mx-3">{menu.name}</span>
                  </div>
                  <div>
                    <Icon
                      icon={'mdi-light:chevron-down'}
                      className=" w-8 h-8"
                    />
                  </div>
                </a>
                {menu.children && activeMenus[menu.key] && (
                  <ul className="ml-5 leading-[2rem] ease-in-out duration-300">
                    {menu.children
                      .filter(
                        (sub) => !sub.user.includes(Number(userDetails?.role))
                      )
                      .map((subMenu) => {
                        return (
                          <li key={subMenu.key}>
                            <Link
                              to={subMenu.key}
                              className="flex justify-between text-primary items-center text-[14px] mx-3"
                            >
                              <div className="flex flex-start items-center">
                                <Icon
                                  icon={
                                    window.location.pathname === subMenu.key
                                      ? 'ph:diamond-fill'
                                      : 'fluent:diamond-20-regular'
                                  }
                                  className="w-2 h-2 mx-4"
                                />
                                <span>{subMenu.name}</span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </li>
            );
          } else {
            console.log(menu.user?.includes(Number(userDetails?.role)), "MENU")
            if (menu.user?.includes(Number(userDetails?.role))) {
              return;
            } else {
              return (<li
                key={menu.key}
                onClick={() => {
                  handleActiveMenu(menu.key);
                }}
                className={
                  activeMenus[menu.key]
                    ? activeMenuClass
                    : 'flex justify-between text-primary items-center font-semibold text-[16px]'
                }
              >
                <Link to={menu.key}>
                  <div className="flex flex-start items-center">
                    <Icon icon={menu.icon} className="w-6 h-6 ml-[1rem]" />
                    <span className="mx-3">{menu.name}</span>
                  </div>
                </Link>
              </li>)
            }
          }
        })}
      </ul>
    </div>
  );
};

export default memo(SidebarMenu);
