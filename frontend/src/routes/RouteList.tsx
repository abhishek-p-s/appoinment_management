import '../App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  Home,
  Login
} from '../pages/index';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import config, { Role } from '../config';
import NotFound from '../components/LoadingAndError/NotFound';

type Element = {
  element: React.FC;
  alias: string;
};

function RouteList() {
  const { token, userDetails } = useSelector((state: RootState) => state.user);
  //making private route with the user is existing or not
  const Private = ({ element: Element, alias: alias }: Element) => {
    if (token) {
      const userRole = config.roles.find(
        (data) => data.id === Number(userDetails?.role)
      ) as Role;
      if (userRole.page_access.includes(alias)) {
        return <Element />;
      } else {
        return <NotFound />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Routes>
        {/* <Route path="*" element={<Navigate replace to="/not-found" />} /> */}
        <Route path="/" element={<Private element={Home} alias="home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-join" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default RouteList;
