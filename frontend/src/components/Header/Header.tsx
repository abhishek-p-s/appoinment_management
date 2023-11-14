import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../redux/slices/sidebarTogle';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';

type HeaderProps = {
  isSidbarNotRequired?: boolean;
  isLogin?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  isSidbarNotRequired,
  isLogin
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);

  const handleOpenSidebar = () => {
    dispatch(setToggle(true));
  };
  return (
    <nav
      className={`md:w-[1fr] ${isSidbarNotRequired ? 'w-full bg-secondary' : 'md:ml-[300px] bg-white'
        } p-5 top-0 z-10`}
    >
      <div className="flex justify-between items-center">
        <div onClick={handleOpenSidebar} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.75 1C17.75 1.19891 17.671 1.38968 17.5303 1.53033C17.3897 1.67098 17.1989 1.75 17 1.75H1C0.801088 1.75 0.610322 1.67098 0.46967 1.53033C0.329018 1.38968 0.25 1.19891 0.25 1C0.25 0.801088 0.329018 0.610322 0.46967 0.46967C0.610322 0.329018 0.801088 0.25 1 0.25H17C17.1989 0.25 17.3897 0.329018 17.5303 0.46967C17.671 0.610322 17.75 0.801088 17.75 1ZM17.75 6C17.75 6.19891 17.671 6.38968 17.5303 6.53033C17.3897 6.67098 17.1989 6.75 17 6.75H1C0.801088 6.75 0.610322 6.67098 0.46967 6.53033C0.329018 6.38968 0.25 6.19891 0.25 6C0.25 5.80109 0.329018 5.61032 0.46967 5.46967C0.610322 5.32902 0.801088 5.25 1 5.25H17C17.1989 5.25 17.3897 5.32902 17.5303 5.46967C17.671 5.61032 17.75 5.80109 17.75 6ZM17.75 11C17.75 11.1989 17.671 11.3897 17.5303 11.5303C17.3897 11.671 17.1989 11.75 17 11.75H1C0.801088 11.75 0.610322 11.671 0.46967 11.5303C0.329018 11.3897 0.25 11.1989 0.25 11C0.25 10.8011 0.329018 10.6103 0.46967 10.4697C0.610322 10.329 0.801088 10.25 1 10.25H17C17.1989 10.25 17.3897 10.329 17.5303 10.4697C17.671 10.6103 17.75 10.8011 17.75 11Z"
              fill="#25408F"
            />
          </svg>
        </div>
        {
          isLogin ? <div className="flex justify-end">
            <Link to='/login' className='text-primary' >
              <div
                className="w-[100px] mx-4 p-4 hover:scale-110 hover:duration-300 bg-white cursor-pointer rounded-xl flex justify-center border-primary md:border-white border-[1px]"
              >
                {token ? 'Home' : 'Login'}
              </div>
            </Link>
            <Link to='/signup' className='text-primary' >
              <div
                className="w-[100px] mx-4 p-4 hover:scale-110 hover:duration-300 bg-white cursor-pointer rounded-xl flex justify-center border-primary md:border-white border-[1px]"
              >
                Signup
              </div>
            </Link>
          </div> :
            < div className="flex justify-end">
              <div
                className="w-[50px] mx-4 p-1 hover:scale-110 hover:duration-300 bg-secondary cursor-pointer rounded-xl flex justify-center border-primary md:border-white border-[1px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                >
                  <path
                    d="M38.3822 31.2891C37.368 29.5312 35.8598 24.6322 35.8598 18.2812C35.8598 14.7381 34.4523 11.3401 31.9469 8.83474C29.4415 6.32938 26.0435 4.92188 22.5004 4.92188C18.9573 4.92188 15.5593 6.32938 13.0539 8.83474C10.5485 11.3401 9.14103 14.7381 9.14103 18.2812C9.14103 24.6322 7.63107 29.5312 6.61681 31.2803C6.42972 31.6007 6.33048 31.9649 6.32912 32.336C6.32775 32.7071 6.4243 33.0719 6.60903 33.3938C6.79375 33.7156 7.06011 33.983 7.38122 34.169C7.70232 34.355 8.06682 34.453 8.4379 34.4531H16.2127C16.3882 35.9978 17.1261 37.4239 18.2858 38.4593C19.4455 39.4948 20.9457 40.0671 22.5004 40.0671C24.0551 40.0671 25.5553 39.4948 26.715 38.4593C27.8747 37.4239 28.6126 35.9978 28.7881 34.4531H36.5629C36.9326 34.4518 37.2954 34.3534 37.615 34.1677C37.9346 33.9821 38.1999 33.7157 38.3841 33.3952C38.5684 33.0748 38.6652 32.7115 38.6649 32.3419C38.6645 31.9722 38.5671 31.6092 38.3822 31.2891ZM22.5004 38.6719C21.3169 38.6717 20.1732 38.2452 19.2786 37.4704C18.384 36.6956 17.7986 35.6244 17.6295 34.4531H27.3713C27.2022 35.6244 26.6168 36.6956 25.7222 37.4704C24.8277 38.2452 23.6839 38.6717 22.5004 38.6719ZM37.1694 32.6953C37.1093 32.8027 37.0214 32.8919 36.9151 32.9538C36.8087 33.0156 36.6877 33.0478 36.5647 33.0469H8.4379C8.31487 33.0478 8.19386 33.0156 8.08749 32.9538C7.98113 32.8919 7.89331 32.8027 7.83321 32.6953C7.7715 32.5884 7.73901 32.4672 7.73901 32.3437C7.73901 32.2203 7.7715 32.0991 7.83321 31.9922C9.14103 29.7369 10.5473 24.4898 10.5473 18.2812C10.5473 15.1111 11.8066 12.0708 14.0483 9.82911C16.2899 7.58747 19.3302 6.32812 22.5004 6.32812C25.6706 6.32812 28.7109 7.58747 30.9525 9.82911C33.1942 12.0708 34.4535 15.1111 34.4535 18.2812C34.4535 24.4881 35.8598 29.7369 37.1676 31.9922C37.2296 32.0989 37.2624 32.2201 37.2627 32.3435C37.263 32.4669 37.2308 32.5883 37.1694 32.6953Z"
                    fill="#25408F"
                  />
                  <circle cx="31" cy="8" r="5" fill="#ED1D35" />
                </svg>
              </div>
            </div>
        }
      </div>
    </nav >
  );
};

export default memo(Header);
