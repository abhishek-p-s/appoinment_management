import { Fragment, ReactNode, memo, useEffect } from 'react';
import { Header, Sidebar } from '..';
import { useScreenWidth } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setToggle } from '../../redux/slices/sidebarTogle';
import { MOBILE_SCREEN_WIDTH } from '../../constant';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  const dispatch = useDispatch();
  const screenWidth = useScreenWidth();
  const { isSidebarOpen } = useSelector(
    (state: RootState) => state.isSidebarOpen
  );

  useEffect(() => {
    if (screenWidth >= MOBILE_SCREEN_WIDTH) {
      dispatch(setToggle(true));
    } else {
      dispatch(setToggle(false));
    }
  }, [dispatch, screenWidth]);

  const handleOutsideSidebarClick = () => {
    if (screenWidth <= MOBILE_SCREEN_WIDTH) {
      dispatch(setToggle(false));
    }
  };

  return (
    <Fragment>
      {isSidebarOpen ? <Sidebar /> : null}
      <Header />
      <div
        className="md:ml-[300px] w-[1fr] p-5 mt-[1rem]"
        onClick={handleOutsideSidebarClick}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default memo(Layout);
