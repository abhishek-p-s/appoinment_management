import ProfileImage from '../../assets/avathar.jpg';
import { Icon } from '@iconify/react';
import SidebarMenu from './SidebarMenu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../redux/slices/userAuth';
import { RootState } from '../../redux/store';
import { useMemo } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: RootState) => state.user);
  const profilePicImage = userDetails?.profilePic
    ? userDetails?.profilePic
    : ProfileImage;
  const userName = useMemo(() => {
    if (userDetails?.name) {
      return userDetails.name.substring(0, 10);
    } else if (userDetails?.displayName) {
      return userDetails.displayName.substring(0, 10);
    }
  }, [userDetails]);

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    confirm({
      title: 'Logout',
      icon: <ExclamationCircleFilled />,
      content: 'Do you Want to Logout?',
      okButtonProps: {
        className: 'logoutButton',
      },
      onOk() {
        dispatch(removeUser());
      },
      centered: true,
    });
  };

  return (
    <div className="bg-secondary w-[300px] h-screen fixed top-0 left-0 p-5 z-10">
      <div className="bg-primary flex justify-between h-[80px] items-center rounded-xl p-3 text-white">
        <div
          className="flex justify-start items-center cursor-pointer"
          onClick={handleProfileButtonClick}
        >
          <div className="w-[4rem] relative">
            <img
              src={profilePicImage}
              alt="profile image"
              className="rounded-xl"
            />
            <div className="w-6 h-6 absolute right-[-7px] bottom-[-5px] bg-white rounded-full p-[3px]  hover:scale-110 hover: duration-300">
              <Icon
                icon="ph:plus-thin"
                color="black"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="mx-5">
            <p className="text-gray-300">Hello,</p>
            <p className="font-bold">{userName}</p>
          </div>
        </div>
        <div
          className="bg-white rounded-md cursor-pointer w-9 p-2 hover:scale-110 hover: duration-300"
          onClick={handleLogout}
        >
          <Icon icon="ph:power-thin" color="black" className="w-full h-full" />
        </div>
      </div>
      <div className="mt-[4rem] overflow-y-auto h-full">
        <SidebarMenu />
      </div>
    </div>
  );
};

export default Sidebar;
