import '../App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  AddDocter,
  ApponitmentList,
  DocterList,
  GustUserPage,
  Home,
  Login,
  PatientList,
  Signup
} from '../pages';
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
        <Route path="/" element={<GustUserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new-join" element={<Login />} />

        <Route path="/user-list" element={<Private element={DocterList} alias="docter" />} />
        <Route path="/add-user" element={<Private element={AddDocter} alias="docter" />} />
        <Route path="/patients" element={<Private element={PatientList} alias="patient" />} />
        <Route path="/appoinments-list" element={<Private element={ApponitmentList} alias="apponitment" />} />
      </Routes>
    </Router>
  );
}

export default RouteList;
